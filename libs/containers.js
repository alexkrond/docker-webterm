const {getShell} = require("./shellLib.js");
const {getImages} = require("./images.js");
const {startSession} = require("./sessions.js");


function killContainer(id) {
  return new Promise((resolve, reject) => {
    const shell = getShell("/usr/bin/docker", ["kill", id]);

    shell.on("exit", async () => {
      const containers = await getContainers();

      if (containers.some(cont => cont.CONTAINER_ID === id)) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}


function getContainers() {
  return new Promise((resolve, reject) => {
    const shell = getShell("/usr/bin/docker", ["ps"]);
    let output = "";

    shell.on("data", data => {
      output += data;
    });

    shell.on("exit", () => {
      let containers = output.split("\r\n").slice(1, -1);
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
}


function runContainer(imageName) {
  return new Promise(async (resolve, reject) => {
    const images = await getImages();
    if (!images.some(image => image.REPOSITORY === imageName)) {
      return resolve(false);
    }

    const shell = getShell("/usr/bin/docker", ["run", "-itd", imageName]);
    const regExp = /^([a-z]|\d){64}$/;
    const idLength = 64;
    const secForChecking = 2;
    const msecForInterval = 100;
    let isChecking = false;
    let output = "";
    let interval;
    let timeEndCheck;
    let id;

    shell.on("data", async data => {
      output += data;
    });

    shell.on("exit", () => {
      const lines = output.split("\r\n");

      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].length === idLength && regExp.test(lines[i])) {
          id = lines[i].substr(0, 12);

          timeEndCheck = new Date();
          timeEndCheck.setSeconds(timeEndCheck.getSeconds() + secForChecking);

          interval = setInterval(check, msecForInterval);
          isChecking = true;
          break;
        }
      }

      if (!isChecking) {
        return resolve(false);
      }

      async function check() {
        if (new Date() > timeEndCheck) {
          clearInterval(interval);
          return resolve(false);
        }

        const containers = await getContainers();

        if (containers.some(cont => cont.CONTAINER_ID === id)) {
          clearInterval(interval);
          return resolve(id);
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
