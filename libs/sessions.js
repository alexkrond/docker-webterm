const {getShell} = require("./shellLib.js");


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


function startSession(ws, sessions, file, args, shellOnExit) {
  const shell = getShell(file, args);

  shell.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (msg) => {
    shell.write(msg);
  });

  const newSession = {
    id: shell._pid.toString(),
    shell: shell,
    ws: ws,
    host: "host" // TODO
  };

  ws.on("close", () => {
    console.log(`${newSession.id}: ws close`);
    killSession(sessions, newSession.id);
  });

  shell.on("exit", shellOnExit || (() => {
    console.log(`${newSession.id}: exit`);
    killSession(sessions, newSession.id);
  }));

  sessions.push(newSession);

  return newSession;
}


module.exports.killSession = killSession;
module.exports.startSession = startSession;
