const fs = require("fs");

const {getShell} = require("./shellLib.js");
const {startSession} = require("./sessions.js");


function getImages(host) {
  return new Promise((resolve, reject) => {
    const shell = getShell(host, "/usr/bin/docker", ["images"]);
    let output = "";

    shell.on("data", data => {
      output += data;
    });

    shell.on("exit", () => {
      let images = output.split("\r\n").slice(1, -1);
      images = images.map(c => {
        let image = c.split(/\s\s+/);
        image = {
          REPOSITORY: image[0],
          TAG: image[1],
          IMAGE_ID: image[2],
          CREATED: image[3],
          SIZE: image[4]
        };

        return image;
      });

      resolve(images);
    });
  });
}


function buildImage(ws, sessions, name) {
  const logFileName = `./logs/BUILD_${name}_${Date.now()}.log`;
  let output = "";

  const shellOnExit = () => {
    console.log(`${session.id}: exit`);

    fs.writeFile(logFileName, output, (err) => {
      if (err) return console.log(err);
      ws.send(`\nЛоги также лежат в файле ${logFileName}`);
    });
  };

  const session = startSession(
      ws,
      sessions,
      "/usr/bin/docker",
      ["build", "-f", "Dockerfile_test", "-t", name, "./"],
      shellOnExit);

  session.shell.on("data", data => {
    output += data;
  });
}


module.exports.buildImage = buildImage;
module.exports.getImages = getImages;
