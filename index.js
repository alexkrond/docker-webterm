import {AttachAddon} from "xterm-addon-attach";
import {Terminal} from "xterm";

const term = new Terminal();
term.open(document.getElementById('terminal'));


const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
const port = location.port ? `:${location.port}` : '';
const socketUrl = `${protocol}${location.hostname}${port}/shell`;
const socket = new WebSocket(socketUrl);

socket.onclose = () => {
  const termElem = document.getElementById("terminal");
  const h2 = document.createElement("h2");

  h2.textContent = "WebSocket closed";
  termElem.innerHTML = "";

  termElem.appendChild(h2);
};

const attachAddon = new AttachAddon(socket);
term.loadAddon(attachAddon);

// term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
