update().then(() => setInterval(update, 20000));

async function update() {
  await updateSessionsList();
  await updateContainersList();
  await updateImagesList();
  await updateDockerfilesList();
}


async function updateSessionsList() {
  const sessionsList = document.querySelector(".sessions-list");
  sessionsList.innerHTML = "";
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
}

async function updateContainersList() {
  const containersList = document.querySelector(".containers-list");
  containersList.innerHTML = "";
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
}

async function updateImagesList() {
  const imagesList = document.querySelector(".images-list");
  imagesList.innerHTML = "";
  const images = await getImages();

  if (images.length === 0) {
    imagesList.textContent = "Образы отсутствуют";
  }

  images.forEach(image => {
    const imageUL = document.createElement("ul");
    const runBtn = document.createElement("button");
    const runAndAttachBtn = document.createElement("button");

    imageUL.style.marginTop = "10px";
    imageUL.style.marginBottom = "30px";
    runBtn.style.marginLeft = "20px";
    runAndAttachBtn.style.marginLeft = "20px";

    runBtn.textContent = "Запустить";
    runAndAttachBtn.textContent = "Запустить и подключиться";

    runBtn.onclick = async () => {
      await runContainer(image.REPOSITORY)();
      await updateContainersList();
    };
    runAndAttachBtn.onclick = async () => {
      const id = await runContainer(image.REPOSITORY)();
      if (!id) return;

      containerAttach(id)();
      await updateContainersList();
    };

    imageUL.appendChild(runBtn);
    imageUL.appendChild(runAndAttachBtn);

    for (let info in image) {
      if (image.hasOwnProperty(info)) {
        const li = document.createElement("li");
        li.textContent = `${info}: ${image[info]}`;
        imageUL.appendChild(li);
      }
    }

    imagesList.appendChild(imageUL);
  });
}

async function updateDockerfilesList() {
  const dockerfilesList = document.querySelector(".dockerfiles-list");
  dockerfilesList.innerHTML = "";
  const dockerfiles = ["Dockerfile_test"];

  if (dockerfiles.length === 0) {
    dockerfilesList.textContent = "Инструкции отсутствуют";
  }

  dockerfiles.forEach(dockerfile => {
    const dockerfilesLI = document.createElement("li");
    const buildBtn = document.createElement("button");

    buildBtn.style.marginLeft = "20px";
    buildBtn.textContent = "Собрать";

    dockerfilesLI.textContent = dockerfile;

    buildBtn.onclick = buildImage("test");

    dockerfilesLI.appendChild(buildBtn);
    dockerfilesList.appendChild(dockerfilesLI);
  });
}


async function getSessions() {
  const data = await fetch("/shell/sessions")
      .catch(err => console.log(err));
  const sessions = await data.json();

  return sessions;
}

async function getContainers() {
  const data = await fetch("/shell/containers")
      .catch(err => console.log(err));
  const containers = await data.json();

  return containers;
}

async function getImages() {
  const data = await fetch("/shell/images")
      .catch(err => console.log(err));
  const images = await data.json();

  return images;
}

function killSession(id) {
  return async () => {
    const data = await fetch(`/shell/sessions/kill/${id}`);
    await updateSessionsList();
    await updateContainersList();
  };
}

function killContainer(id) {
  return async () => {
    const data = await fetch(`/shell/containers/kill/${id}`);
    await updateSessionsList();
    await updateContainersList();
  };
}

function runContainer(image) {
  return async () => {
    const data = await fetch(`/shell/containers/run/${image}`);
    const body = await data.json();

    if (body.status === "OK") {
      return body.id;
    } else {
      return alert("Контейнер не запущен");
    }
  };
}

function containerAttach(id) {
  return () => {
    window.open(`/shell/containers/attach/${id}`);
  };
}

function buildImage(name) {
  return () => {
    window.open(`/shell/images/build/${name}`);
  };
}
