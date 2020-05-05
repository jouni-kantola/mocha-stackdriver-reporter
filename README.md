# Mocha Stackdriver Reporter

Mocha reporter using the Google Cloud Logging API.

![npm cit](https://github.com/jouni-kantola/mocha-stackdriver-reporter/workflows/npm%20cit/badge.svg)

## Install

`npm install mocha-stackdriver-reporter --save-dev`

## CLI

`mocha --reporter mocha-stackdriver-reporter --reporter-options projectId=myGcpProjectId,logName=myLogName`

## Code

```javascript
const Mocha = require("mocha");
const StackdriverReporter = require("mocha-stackdriver-reporter");

const mocha = new Mocha());

mocha.reporter(StackdriverReporter, {
  projectId: "myGcpProjectId",
  logName: "myLogName",
  alsoConsole: false // (optional) if true, also output result to console
});
```
