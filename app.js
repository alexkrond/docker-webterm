const express = require("express");
const exphbs = require("express-handlebars");

const {allHostsShellRouterInit} = require("./routes/api/allHostsShell.js");
const {hostShellRouterInit} = require("./routes/api/hostShell.js");
const {startSession} = require("./libs/sessions.js");
const {containerAttach} = require("./libs/containers.js");
const {buildImage} = require("./libs/images.js");


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


expressWs.app.ws('/shell', (ws, req) => {
  console.log(req);
  startSession(ws, sessions, req.query.host, "/usr/bin/docker", ["run", "-it", "nginx", "bash"]);
});

expressWs.app.ws('/shell/containers/attach/:id', (ws, req) => {
  containerAttach(ws, sessions, req.query.host, req.params.id);
});

expressWs.app.ws('/shell/images/build/:name', (ws, req) => {
  buildImage(ws, sessions, req.query.host, req.params.name);
});


app.use("/shell", allHostsShellRouterInit(sessions));
app.use("/shell", hostShellRouterInit(sessions));
app.use(express.static(__dirname));


process.on("SIGINT", () => {
  sessions.forEach(session => session.shell.kill());
  process.exit();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
