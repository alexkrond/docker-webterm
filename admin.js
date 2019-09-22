(async () => {
  const sessionsList = document.querySelector(".sessions-list");
  const sessions = await getSessions();

  if (sessions.length === 0) {
    sessionsList.textContent = "Нет активных сессий";
  }

  sessions.forEach(id => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.style.marginLeft = "20px";

    li.textContent = id;
    btn.textContent = "Завершить";

    btn.onclick = killSession(id);
    li.appendChild(btn);

    sessionsList.appendChild(li);
  });



  const containersList = document.querySelector(".containers-list");
  const containers = await getContainers();

  if (containers.length === 0) {
    containersList.textContent = "Нет запущенных контейнеров";
  }

  containers.forEach(container => {
    const containerUL = document.createElement("ul");
    const attachBtn = document.createElement("button");
    const killBtn = document.createElement("button");

    containerUL.style.marginTop = "10px";
    containerUL.style.marginBottom = "30px";
    attachBtn.style.marginLeft = "20px";
    killBtn.style.marginLeft = "20px";

    attachBtn.textContent = "Подключиться";
    killBtn.textContent = "Убить";

    attachBtn.onclick = containerAttach(container.CONTAINER_ID);
    killBtn.onclick = killContainer(container.CONTAINER_ID);

    containerUL.appendChild(attachBtn);
    containerUL.appendChild(killBtn);

    for (let info in container) {
      if (container.hasOwnProperty(info)) {
        const li = document.createElement("li");
        li.textContent = `${info}: ${container[info]}`;
        containerUL.appendChild(li);
      }
    }

    containersList.appendChild(containerUL);
  });
})();





async function getSessions() {
  const data = await fetch("/shell/sessions")
      .catch(err => console.log(err));
  const sessions = await data.json();

  return sessions;
}

function killSession(id) {
  return async () => {
    const data = await fetch(`/shell/sessions/kill/${id}`);
    location.reload();
  };
}


async function getContainers() {
  const data = await fetch("/shell/containers")
      .catch(err => console.log(err));
  const containers = await data.json();

  return containers;
}

function containerAttach(id) {
  return () => {
    window.open(`/shell/containers/attach/${id}`);
  };
}

function killContainer(id) {
  return async () => {
    const data = await fetch(`/shell/containers/kill/${id}`);
    location.reload();
  };
}
