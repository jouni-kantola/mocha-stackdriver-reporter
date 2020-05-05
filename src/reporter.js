"use strict";

const Mocha = require("mocha");
const CloudLogger = require("./google-cloud-logger");

const {
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

function StackdriverReporter(runner, options = {}) {
  const { reporterOptions } = options;
  const { projectId, logName } = ensureOptions(reporterOptions);

  const log = new CloudLogger(projectId, logName);

  const result = {
    passes: [],
    failures: [],
  };

  runner
    .on(EVENT_TEST_PASS, (test) => {
      result.passes.push(test.fullTitle());
    })
    .on(EVENT_TEST_FAIL, (test, err) => {
      result.failures.push({
        test: test.fullTitle(),
        message: err.message,
      });
    })
    .once(EVENT_RUN_END, () => {
      if (reporterOptions.alsoConsole || reporterOptions.onlyConsole)
        console.log("result", JSON.stringify(result));

      if (!reporterOptions.onlyConsole) {
      if (result.failures.length > 0) log.error(result);
      else log.info(result);
      }
    });
}

function ensureOptions(reporterOptions) {
  if (
    !reporterOptions ||
    !reporterOptions.projectId ||
    !reporterOptions.logName
  ) {
    const errorMessage = `
Required reporter options not set.
Please, supply Google Cloud Platform project ID and log name.
Example: --reporter-options projectId=myGcpProjectId,logName=myLog
`;
    console.error("Error:", errorMessage);

    throw new Error(errorMessage);
  }

  const { projectId, logName } = reporterOptions;

  return {
    projectId,
    logName,
  };
}

module.exports = StackdriverReporter;
