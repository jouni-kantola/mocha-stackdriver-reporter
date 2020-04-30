"use strict";

const Mocha = require("mocha");
const {
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
} = Mocha.Runner.constants;

class StackdriverMochaReporter {
  constructor(runner) {
    this._indents = 0;
    const stats = runner.stats;

    runner
      .on(EVENT_TEST_PASS, (test) => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log(`${this.indent()}pass: ${test.fullTitle()}`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(EVENT_RUN_END, () => {
        console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
      });
  }

  indent() {
    return Array(this._indents).join("  ");
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = StackdriverMochaReporter;
