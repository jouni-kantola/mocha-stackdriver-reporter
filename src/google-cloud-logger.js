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
    // Prepares a log entry
    const entry = log.entry(metadata, result);

    // Writes the log entry
    await log.info(entry);

    console.log("Logged", `${JSON.stringify(result)}`);
  }

  async function fail(result) {
    // Prepares a log entry
    const entry = log.entry(metadata, result);

    // Writes the log entry
    await log.error(entry);

    console.log("Logged", `${JSON.stringify(result)}`);
  }

  return {
    success,
    fail,
  };
};

module.exports = CloudLogger;
