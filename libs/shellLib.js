const pty = require("node-pty");


function getShell(file, args = []) {
  const shell = pty.spawn(file, args, {
    name: 'xterm-color',
    cwd: process.env.PWD,
    env: process.env
  });

  return shell;
}


module.exports.getShell = getShell;
