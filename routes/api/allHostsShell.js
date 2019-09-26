const express = require("express");
const dockerHosts = require("../../dockerHost.config.js");

const {killSession} = require("../../libs/sessions.js");


function allHostsShellRouterInit(sessions) {
  const router = express.Router();

  router.get("/hosts", ((req, res) => {
    res.json(dockerHosts);
  }));

  router.get("/all-sessions", (req, res) => {
    res.json(sessions.map(session => ({id: session.id, host: session.host.name})));
  });

  router.get("/sessions/kill/:id", (req, res) => {
    if (killSession(sessions, req.params.id)) {
      res.json({status: "OK", msg: `Terminal with pid ${req.params.id} was killed.`});
    } else {
      res.json({status: "false", msg: `No terminal with pid ${req.params.id}.`});
    }
  });

  return router;
}


module.exports.allHostsShellRouterInit = allHostsShellRouterInit;
