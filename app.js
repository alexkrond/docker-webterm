const express = require("express");
const exphbs = require("express-handlebars");

const {routerInit} = require("./routes/api/shell.js");
const {startSession} = require("./libs/sessions.js");
const {containerAttach, getContainers} = require("./libs/containers.js");
const {buildImage} = require("./libs/images.js");


const app = express();
const expressWs = require('express-ws')(app);


app.get("/", (req, res) => {
  res.render("admin");
});

app.get("/shell", (req, res) => {
  res.render("index");
});

app.get("/shell/containers/attach/:id", async (req, res) => {
  const containers = await getContainers();

  if (containers.some(cont => cont.CONTAINER_ID === req.params.id)) {
    res.render("index");
  } else {
    res.json({status: "false", msg: `No container with id ${req.params.id}.`});
  }
});

app.get("/shell/images/build/:name", (req, res) => {
  res.render("index");
});


let sessions = [];

expressWs.app.ws('/shell', (ws, req) => {
  startSession(ws, sessions, "/usr/bin/docker", ["run", "-it", "nginx", "bash"]);
});

expressWs.app.ws('/shell/containers/attach/:id', (ws, req) => {
  containerAttach(ws, sessions, req.params.id);
});

expressWs.app.ws('/shell/images/build/:name', (ws, req) => {
  buildImage(ws, sessions, req.params.name);
});


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname));
app.use("/shell", routerInit(sessions));


process.on("SIGINT", () => {
  sessions.forEach(session => session.shell.kill());
  process.exit();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
