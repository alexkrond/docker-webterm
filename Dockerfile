FROM ubuntu

RUN mkdir -p /app/dist
RUN mkdir -p /app/bin

WORKDIR /app

COPY ./app.js .
COPY ./index.html .
COPY ./package.json .
COPY ./dist/bundle.js ./dist
COPY ./bin/install.sh ./bin

RUN chmod u+x ./bin/install.sh
RUN ./bin/install.sh

#WORKDIR /
RUN mkdir -p /test
WORKDIR /test

COPY ./Dockerfile_test /test/Dockerfile

CMD node /app/app.js
