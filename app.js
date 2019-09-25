const express = require("express");
const exphbs = require("express-handlebars");

const {routerInit} = require("./routes/api/shell.js");
const {startSession} = require("./libs/sessions.js");
const {containerAttach} = require("./libs/containers.js");
const {buildImage} = require("./libs/images.js");
const dockerHosts = require("./dockerHost.config.js");


const app = express();
const expressWs = require('express-ws')(app);

let sessions = [];


app.set('views', __dirname + '/views');
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
  res.render("admin");
});

app.get("/shell/hosts", ((req, res) => {
  res.json(dockerHosts);
}));

app.get("/shell/all-sessions", (req, res) => {
  res.json(sessions.map(session => ({id: session.id, host: session.host.name})));
});


expressWs.app.ws('/shell', (ws, req) => {
  startSession(ws, sessions, "/usr/bin/docker", ["run", "-it", "nginx", "bash"]);
});

expressWs.app.ws('/shell/containers/attach/:id', (ws, req) => {
  containerAttach(ws, sessions, req.params.id);
});

expressWs.app.ws('/shell/images/build/:name', (ws, req) => {
  buildImage(ws, sessions, req.params.name);
});


app.use("/shell", routerInit(sessions));
app.use(express.static(__dirname));


process.on("SIGINT", () => {
  sessions.forEach(session => session.shell.kill());
  process.exit();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
