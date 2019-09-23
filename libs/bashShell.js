const pty = require("node-pty");


function getBashShell(file, args = []) {
  const shell = pty.spawn(file, args, {
    name: 'xterm-color',
    cwd: process.env.PWD,
    env: process.env
  });

  return shell;
}


module.exports.getBashShell = getBashShell;
