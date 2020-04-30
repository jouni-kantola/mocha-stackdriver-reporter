"use strict";

const Mocha = require("mocha");
const {
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

class StackdriverMochaReporter {
  constructor(runner) {
    const result = {
      passes: [],
      failures: [],
    };
    
    runner
      .on(EVENT_TEST_PASS, (test) => {
        result.passes.push(test.fullTitle());
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        result.failures.push([test.fullTitle(), err.message]);
      })
      .once(EVENT_RUN_END, () => {
        console.log('passed', `${result.passes.length}/${result.passes.length + result.failures.length}`);
        console.dir(result);
      });
  }
}

module.exports = StackdriverMochaReporter;
