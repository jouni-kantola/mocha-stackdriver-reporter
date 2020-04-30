// Imports the Google Cloud client library
const { Logging } = require("@google-cloud/logging");

const CloudLogger = (
  projectId = "YOUR_PROJECT_ID", // Your Google Cloud Platform project ID
  logName = "my-log" // The name of the log to write to
) => {
  // Creates a client
  const logging = new Logging({ projectId });

  // Selects the log to write to
  const log = logging.log(logName);

  // The metadata associated with entries
  const metadata = {
    resource: { type: "global" },
  };

  async function success(result) {
    console.log("success", `${JSON.stringify(result)}`);

    // Prepares a log entry
    const entry = log.entry(metadata, result);

    // Writes the log entry
    await log.info(entry);
  }

  async function fail(result) {
    console.error("fail", `${JSON.stringify(result)}`);

    // Prepares a log entry
    const entry = log.entry(metadata, result);

    // Writes the log entry
    await log.error(entry);
  }

  return {
    success,
    fail,
  };
};

module.exports = CloudLogger;
