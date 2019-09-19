const fs = require("fs");

function killSession(sessions, id) {
  let isKilled = false;

  for (let i = 0; i < sessions.length; i++) {
    if (sessions[i] && sessions[i].id === id) {
      sessions[i].shell.kill();
      sessions[i].ws.terminate();

      sessions.splice(i, 1);

      isKilled = true;
      break;
    }
  }

  return isKilled;
}


function killContainer(shell, id) {
  return new Promise((resolve, reject) => {
    const numberOfOutputLines = 5;
    let linesCounter = 0;

    shell.on("data", async data => {
      linesCounter++;

      if (linesCounter === numberOfOutputLines) {
        const containers = await getContainers(shell);

        if (containers.some(cont => cont.CONTAINER_ID === id)) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    });

    shell.write(`docker kill ${id}\r`);
  });
}


function getContainers(shell) {
  return new Promise((resolve, reject) => {
    const path = __dirname + "/.cont.txt";

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

    shell.write(`docker ps > ${path}\r`);
  });
}


module.exports.killSession = killSession;
module.exports.killContainer = killContainer;
module.exports.getContainers = getContainers;
