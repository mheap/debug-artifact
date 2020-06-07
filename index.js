const artifact = require("@actions/artifact");
const io = require("@actions/io");
const payload = require(process.env.GITHUB_EVENT_PATH);

const fs = require("fs");

(async () => {
  // Write all environment vars to a file to upload
  var stream = fs.createWriteStream("env");

  // Wait for the file to be open
  await new Promise((resolve) => {
    stream.once("open", resolve);
  });

  // Write out any prefixes we're looking for
  const allowedPrefixes = ["GITHUB", "INPUT"];
  for (let key in process.env) {
    const [prefix, _] = key.split("_", 1);
    if (allowedPrefixes.includes(prefix)) {
      stream.write(`${key}="${process.env[key]}"\n`);
    }
  }

  // Close the stream
  stream.end();

  // Upload as an artifact

  let suffix = ``;
  if (payload.action) {
    suffix = `-${payload.action}`;
  }

  const filename = `${process.env.GITHUB_EVENT_NAME}${suffix}.json`;
  const eventPayloadPath = `/github/workspace/${filename}`;
  await io.cp(process.env.GITHUB_EVENT_PATH, eventPayloadPath);

  const artifactClient = artifact.create();
  const artifactName = "debug-logs";
  const files = [eventPayloadPath, "/github/workspace/env"];
  const rootDirectory = "/github/workspace";

  const uploadResult = await artifactClient.uploadArtifact(
    artifactName,
    files,
    rootDirectory
  );

  console.log(uploadResult);

  console.log("All done");
})();
