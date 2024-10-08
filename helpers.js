import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function setupDebugLogging(debugLogPath) {
  if (fs.existsSync(debugLogPath)) {
    fs.unlinkSync(debugLogPath);
  }

  function logDebug(message) {
    if (typeof message === "object") {
      message = JSON.stringify(message, null, 2);
    }
    fs.appendFileSync(
      debugLogPath,
      `[${new Date().toISOString()}] ${message}\n`
    );
  }

  console.log = function (message, ...optionalParams) {
    if (optionalParams.length > 0) {
      message +=
        " " +
        optionalParams
          .map((param) =>
            typeof param === "object" ? JSON.stringify(param, null, 2) : param
          )
          .join(" ");
    }
    logDebug(message);
  };
}

export function debugToFile(data, callback) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.join(__dirname, "debug.log");
  const now = new Date();
  const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // Check if data is an object, and if it is, convert it to a JSON string
  let content;
  if (typeof data === "object" && data !== null) {
    content = `${timestamp} - ${JSON.stringify(data, null, 2)}\n`;
  } else {
    content = `${timestamp} - ${data}\n`;
  }

  // Append the content to the log file
  fs.writeFile(filePath, content, { flag: "a" }, (err) => {
    if (err) {
      console.error("Error writing to log file:", err); // Handle the error, if any
    } else {
      if (callback) callback();
    }
  });
}

export function stripAnsiCodes(input) {
  return input.replace(
    /[\u001b\u009b][[()#;?]*(?:(?:[a-zA-Z\d]*(?:;[a-zA-Z\d]*)*)?\u0007|(?:\d{1,4}(?:;\d{0,4})*)?[0-9A-ORZcf-nq-uy=><~])/g,
    ""
  );
}

export function getFormattedDateTime() {
  const now = new Date();

  return now
    .toISOString()
    .replace(/T/, "_")
    .replace(/\..+/, "")
    .replace(/:/g, "_");
}
