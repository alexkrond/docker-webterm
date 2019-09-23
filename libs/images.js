const uuid = require("uuid");
const fs = require("fs");

const {getBashShell} = require("./bashShell.js");
const {startSession} = require("./sessions.js");


function getImages() {
  return new Promise((resolve, reject) => {
    const shell = getBashShell("/bin/bash");
    const fileId = uuid.v4();
    const path = __dirname + `/.images_${fileId}.txt`;
    const cmd = `docker images > ${path}\r`;

    shell.on("data", data => {
      fs.access(path, fs.F_OK, err => {
        if (err) return;

        shell.kill();

        fs.readFile(path, 'utf8', (err, data) => {
          if (err) reject(err);

          fs.unlink(path, err => {
            if (err) reject(err);
          });

          let images = data.split("\n").slice(1, -1);
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
    });

    shell.write(cmd);
  });
}


function buildImage(ws, sessions, name) {
  const logFileName = `./logs/BUILD_${name}_${Date.now()}.log`;

  const shellOnExit = () => {
    console.log(`${session.id}: exit`);
    ws.send(`\nЛоги также лежат в файле ${logFileName}`);
  };

  const session = startSession(
      ws,
      sessions,
      "/usr/bin/docker",
      ["build", "-f", "Dockerfile_test", "-t", name, "./"],
      shellOnExit);

  session.shell.on("data", data => {
    fs.appendFile(logFileName, data, () => {
    });
  });
}


module.exports.buildImage = buildImage;
module.exports.getImages = getImages;
