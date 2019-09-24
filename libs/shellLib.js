const pty = require("node-pty");
const dockerHosts = require("../dockerHost.config.js");


function getShell(file, args = []) {
  if (file.indexOf("docker") !== -1 && dockerHosts.current !== dockerHosts.hosts["localhost"]) {
    args.unshift("-H", dockerHosts.current.url);
  }

  const shell = pty.spawn(file, args, {
    name: 'xterm-color',
    cwd: process.env.PWD,
    env: process.env
  });

  return shell;
}


module.exports.getShell = getShell;
