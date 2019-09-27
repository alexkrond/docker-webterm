FROM ubuntu

RUN mkdir -p /app

WORKDIR /app

COPY ./bin/install.sh ./bin/install.sh
COPY ./package.json ./package.json

RUN chmod u+x ./bin/install.sh
RUN ./bin/install.sh

COPY ./dist ./dist
COPY ./libs ./libs
COPY ./routes ./routes
COPY ./views ./views

COPY ./app.js ./app.js
COPY ./Dockerfile_test ./Dockerfile_test
COPY ./dockerHost.config.js ./dockerHost.config.js
COPY ./index.js ./index.js

RUN mkdir -p ./logs

CMD node app.js
