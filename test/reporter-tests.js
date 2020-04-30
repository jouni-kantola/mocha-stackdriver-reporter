const assert = require("assert");

const StackdriverReporter = require("../");

describe("StackdriverReporter", function () {
  it("projectId and logName options required", function () {
    assert.throws(
      StackdriverReporter,
      /projectId=myGcpProjectId,logName=myLog/
    );
  });
});
