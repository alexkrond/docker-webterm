const express = require("express");
const uuid = require("uuid");
const pty = require("node-pty");

const app = express();
const expressWs = require('express-ws')(app);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin", (req, res) => {
  res.json(sessions.map(session => session.id));
});

app.use(express.static(__dirname));

let sessions = [];

expressWs.app.ws('/shell', (ws, req) => {
  const shell = pty.spawn('/bin/bash', [], {
  // const shell = pty.spawn('/usr/bin/docker', ["run", "-it", "-v", "/var/run/docker.sock:/var/run/docker.sock", "nginx", "bash"], {
  // const shell = pty.spawn('/usr/bin/docker', ["run", "-itd", "nginx", "bash"], {
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
    id: uuid.v4(),
    shell: shell,
  };

  sessions.push(newSession);
});

process.on("SIGINT", () => {
  // shells.forEach(shell => shell.write("exit\r"));
  shells.forEach(shell => shell.kill());
  process.exit();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
