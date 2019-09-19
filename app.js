const express = require("express");
const {routerInit} = require("./routes/api/shell.js");
const {killSession} = require("./shellLib.js");
const pty = require("node-pty");

const app = express();
const expressWs = require('express-ws')(app);


app.get("/shell", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


let sessions = [];

expressWs.app.ws('/shell', (ws, req) => {
  // const shell = pty.spawn('/bin/bash', [], {
  // const shell = pty.spawn('/usr/bin/docker', ["run", "-it", "-v", "/var/run/docker.sock:/var/run/docker.sock", "nginx", "bash"], {
  const shell = pty.spawn('/usr/bin/docker', ["run", "-it", "nginx", "bash"], {
    name: 'xterm-color',
    cwd: process.env.PWD,
    env: process.env
  });

  // shell.write("docker build -t test ./ | tee build.log\r");
  // shell.write("echo 'Логи в ./build.log'\r");
  // shell.write("nano build.log");
  // shell.write("docker run -itd --name hi nginx\r");
  // shell.write("docker exec -it hi bash\r");


  shell.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (msg) => {
    shell.write(msg);
  });

  const newSession = {
    id: shell._pid.toString(),
    shell: shell,
    ws: ws
  };

  ws.on("close", () => {
    console.log(`${newSession.id}: ws close`);
    killSession(sessions, newSession.id);
  });

  shell.on("exit", () => {
    console.log(`${newSession.id}: exit`);
    killSession(sessions, newSession.id);
  });

  sessions.push(newSession);
});


app.use(express.static(__dirname));
app.use("/shell", routerInit(sessions));


process.on("SIGINT", () => {
  sessions.forEach(session => session.shell.kill());
  process.exit();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
