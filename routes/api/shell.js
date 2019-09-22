const express = require("express");
const {killSession, killContainer, getContainers, runContainer, getImages} = require("../../shellLib.js");


function routerInit(sessions) {
  const router = express.Router();

  router.get("/sessions", (req, res) => {
    res.json(sessions.map(session => session.id));
  });

  router.get("/containers", async (req, res) => {
    const containers = await getContainers().catch(err => console.log(err));
    res.json(containers);
  });

  router.get("/images", async (req, res) => {
    const images = await getImages().catch(err => console.log(err));
    res.json(images);
  });

  router.get("/sessions/kill/:id", (req, res) => {
    if (killSession(sessions, req.params.id)) {
      res.json({status: "OK", msg: `Terminal with pid ${req.params.id} was killed.`});
    } else {
      res.json({status: "false", msg: `No terminal with pid ${req.params.id}.`});
    }
  });

  router.get("/containers/kill/:id", async (req, res) => {
    const isKilled = await killContainer(req.params.id);

    if (isKilled) {
      res.json({status: "OK", msg: `Container with id ${req.params.id} was killed.`});
    } else {
      res.json({status: "false", msg: `Container with id ${req.params.id} was not killed.`});
    }
  });

  router.get("/containers/run/:image", async (req, res) => {
    const id = await runContainer(req.params.image);

    if (id) {
      res.json({status: "OK", id: id, msg: `Container with image ${req.params.image} was created.`});
    } else {
      res.json({status: "false", msg: `Container with image ${req.params.image} was not created.`});
    }
  });


  return router;
}


module.exports.routerInit = routerInit;
