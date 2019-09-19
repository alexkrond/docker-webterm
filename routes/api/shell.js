const express = require("express");
const {killSession, killContainer, getContainers} = require("../../shellLib.js");
const pty = require("node-pty");


function routerInit(sessions) {
  const router = express.Router();

  router.get("/sessions", (req, res) => {
    res.json(sessions.map(session => session.id));
  });

  router.get("/sessions/kill/:id", (req, res) => {
    if (killSession(sessions, req.params.id)) {
      res.json({msg: `Terminal with pid ${req.params.id} was killed.`});
    } else {
      res.json({msg: `No terminal with pid ${req.params.id}.`});
    }
  });

  router.get("/containers/kill/:id", async (req, res) => {
    const shell = pty.spawn('/bin/bash', [], {
      name: 'xterm-color',
      cwd: process.env.PWD,
      env: process.env
    });

    const isKilled = await killContainer(shell, req.params.id);

    if (isKilled) {
      res.json({msg: `Container with id ${req.params.id} was killed.`});
    } else {
      res.json({msg: `No container with id ${req.params.id}.`});
    }
  });

  router.get("/containers", async (req, res) => {
    const shell = pty.spawn('/bin/bash', [], {
      name: 'xterm-color',
      cwd: process.env.PWD,
      env: process.env
    });

    const containers = await getContainers(shell).catch(err => console.log(err));
    res.json(containers);
  });

  return router;
}


module.exports.routerInit = routerInit;
