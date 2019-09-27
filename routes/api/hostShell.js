const express = require("express");

const {killContainer, getContainers, runContainer} = require("../../libs/containers.js");
const {getImages} = require("../../libs/images.js");
const {checkHost} = require("../../libs/shellLib.js");
const {getSessionsForHost} = require("../../libs/sessions.js");


function hostShellRouterInit(sessions) {
  const router = express.Router();

  router.use((req, res, next) => {
    if (!req.query.host) {
      return res.json({status: "false", msg: "No host specified."});
    }
    if (!checkHost(req.query.host)) {
      return res.json({status: "false", msg: `No host ${req.query.host}.`});
    }
    next();
  });

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/sessions", (req, res) => {
    const ss = getSessionsForHost(sessions, req.query.host);
    res.json(ss.map(session => ({id: session.id, host: session.host.name})));
  });

  router.get("/containers", async (req, res) => {
    const containers = await getContainers(req.query.host).catch(err => console.log(err));
    res.json(containers);
  });

  router.get("/images", async (req, res) => {
    const images = await getImages(req.query.host).catch(err => console.log(err));
    res.json(images);
  });

  router.get("/containers/kill/:id", async (req, res) => {
    const isKilled = await killContainer(req.query.host, req.params.id);

    if (isKilled) {
      res.json({status: "OK", msg: `Container with id ${req.params.id} was killed.`});
    } else {
      res.json({status: "false", msg: `Container with id ${req.params.id} was not killed.`});
    }
  });

  router.get("/containers/run/:image", async (req, res) => {
    const id = await runContainer(req.query.host, req.params.image);

    if (id) {
      res.json({status: "OK", id: id, msg: `Container with image ${req.params.image} was created.`});
    } else {
      res.json({status: "false", msg: `Container with image ${req.params.image} was not created.`});
    }
  });

  router.get("/containers/attach/:id", async (req, res) => {
    const containers = await getContainers(req.query.host);

    if (containers.some(cont => cont.CONTAINER_ID === req.params.id)) {
      res.render("index");
    } else {
      res.json({status: "false", msg: `No container with id ${req.params.id}.`});
    }
  });

  router.get("/images/build/:name", (req, res) => {
    res.render("index");
  });


  return router;
}


module.exports.hostShellRouterInit = hostShellRouterInit;
