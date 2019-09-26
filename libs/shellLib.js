const pty = require("node-pty");
const dockerHosts = require("../dockerHost.config.js");


function getShell(host, file, args = []) {
  if (file.indexOf("docker") !== -1 && host !== "localhost") {
    args.unshift("-H", host);
  }

  const shell = pty.spawn(file, args, {
    name: 'xterm-color',
    cwd: process.env.PWD,
    env: process.env
  });

  return shell;
}

function checkHost(host) {
  return dockerHosts.hasOwnProperty(host);
}


module.exports.getShell = getShell;
module.exports.checkHost = checkHost;
