const assert = require("assert");
const Mocha = require("mocha");

const StackdriverReporter = require("../");

describe("StackdriverReporter", function () {
  it("projectId and logName options required", function () {
    assert.throws(
      StackdriverReporter,
      /projectId=myGcpProjectId,logName=myLog/
    );
  });

  it("can specify entry metadata as object literal", (done) => {
    const options = {
      reporterOptions: {
        onlyConsole: true,
        projectId: "my-project",
        logName: "my-log",
        "entry-metadata": {
          resource: {
            labels: {
              function_name: "my-cloud-function",
              project_id: "my-project",
              region: "my-region",
            },
            type: "cloud_function",
          },
        },
      },
    };

    const runner = new Mocha().run(done);

    new StackdriverReporter(runner, options);
  });

  it("can specify entry metadata as JSON", (done) => {
    const entryMetadata = JSON.stringify({
      resource: {
        labels: {
          function_name: "my-cloud-function",
          project_id: "my-project",
          region: "my-region",
        },
        type: "cloud_function",
      },
    });

    const options = {
      reporterOptions: {
        onlyConsole: true,
        projectId: "my-project",
        logName: "my-log",
        "entry-metadata": entryMetadata,
      },
    };

    const runner = new Mocha().run(done);

    new StackdriverReporter(runner, options);
  });

  it("entry metadata required as JSON like format", (done) => {
    const options = {
      reporterOptions: {
        projectId: "my-project",
        logName: "my-log",
        "entry-metadata": 666,
      },
    };

    const runner = new Mocha().run(done);
    assert.throws(
      () => new StackdriverReporter(runner, options),
      /Reporter option 'entry-metadata' cannot be parsed to JSON/
    );
  });
});
