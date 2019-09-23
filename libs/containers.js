const uuid = require("uuid");
const fs = require("fs");

const {getBashShell} = require("./bashShell.js");
const {getImages} = require("./images.js");
const {startSession} = require("./sessions.js");


function killContainer(id) {
  return new Promise((resolve, reject) => {
    const shell = getBashShell("/bin/bash");
    const cmd = `docker kill ${id}\r`;
    const numberOfOutputLines = 4;
    let linesCounter = 0;

    shell.on("data", async data => {
      linesCounter++;
      console.log(linesCounter);

      if (linesCounter >= numberOfOutputLines) {
        shell.kill();

        const containers = await getContainers();

        if (containers.some(cont => cont.CONTAINER_ID === id)) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    });

    shell.write(cmd);
  });
}


function getContainers() {
  return new Promise((resolve, reject) => {
    const shell = getBashShell("/bin/bash");
    const fileId = uuid.v4();
    const path = __dirname + `/.containers_${fileId}.txt`;
    const cmd = `docker ps > ${path}\r`;

    shell.on("data", data => {
      fs.access(path, fs.F_OK, err => {
        if (err) return;

        shell.kill();

        fs.readFile(path, 'utf8', (err, data) => {
          if (err) reject(err);

          fs.unlink(path, err => {
            if (err) reject(err);
          });

          let containers = data.split("\n").slice(1, -1);
          containers = containers.map(c => {
            let container = c.split(/\s\s+/);
            container = {
              CONTAINER_ID: container[0],
              IMAGE: container[1],
              COMMAND: container[2],
              CREATED: container[3],
              STATUS: container[4],
              PORTS: container[5],
              NAMES: container[6]
            };

            return container;
          });

          resolve(containers);
        });
      });
    });

    shell.write(cmd);
  });
}


function runContainer(imageName) {
  return new Promise(async (resolve, reject) => {
    const images = await getImages();
    if (!images.some(image => image.REPOSITORY === imageName)) {
      resolve(false);
    }

    const shell = getBashShell("/usr/bin/docker", ["run", "-itd", imageName]);
    const regExp = /^([a-z]|\d){64}$/;
    const idLength = 64;
    const secForCreating = 3;
    let inProgress = false;
    let interval;
    let timeStamp;
    let id;

    shell.on("data", async data => {
      const str = data.replace("\r\n", "");

      if (str.length === idLength && regExp.test(str) && !inProgress) {
        id = str.substr(0, 12);

        timeStamp = new Date();
        timeStamp.setSeconds(timeStamp.getSeconds() + secForCreating);

        inProgress = true;
        interval = setInterval(check, 500);
      }

      async function check() {
        if (new Date() > timeStamp) {
          clearInterval(interval);
          shell.kill();
          resolve(false);
        }

        const containers = await getContainers();

        if (containers.some(cont => cont.CONTAINER_ID === id)) {
          clearInterval(interval);
          shell.kill();
          resolve(id);
        }
      }
    });
  });
}


function containerAttach(ws, sessions, id) {
  startSession(ws, sessions, "/usr/bin/docker", ["exec", "-it", id, "bash"]);
}


module.exports.killContainer = killContainer;
module.exports.getContainers = getContainers;
module.exports.runContainer = runContainer;
module.exports.containerAttach = containerAttach;
