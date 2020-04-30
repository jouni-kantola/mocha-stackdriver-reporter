"use strict";

const Mocha = require("mocha");
const CloudLogger = require("./google-cloud-logger");

const {
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

function StackdriverMochaReporter(runner) {
  const result = {
    passes: [],
    failures: [],
  };

  const logger = new CloudLogger();

  runner
    .on(EVENT_TEST_PASS, (test) => {
      result.passes.push(test.fullTitle());
    })
    .on(EVENT_TEST_FAIL, (test, err) => {
      result.failures.push([test.fullTitle(), err.message]);
    })
    .once(EVENT_RUN_END, () => {
      if (result.failures.length) logger.fail(result);
      else logger.success(result);
    });
}

module.exports = StackdriverMochaReporter;
