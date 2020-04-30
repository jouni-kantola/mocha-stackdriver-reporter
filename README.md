# Mocha Stackdriver Reporter

Mocha reporter using the Google Cloud logging API

## Install

`npm install mocha-stackdriver-reporter --save-dev`

## CLI

`mocha --reporter mocha-stackdriver-reporter --reporter-options projectId=myGoogleCloudProjectId,logName=myStackDriverLogName`

## Code

```javascript
const Mocha = require("mocha");
const StackdriverReporter = require("mocha-stackdriver-reporter");

const mocha = new Mocha());
mocha.reporter(stackdriverReporter, {
  projectId: "myGoogleCloudProjectId",
  logName: "myStackDriverLogName",
  alsoConsole: false // (optional) if true, also output result to console
});
```