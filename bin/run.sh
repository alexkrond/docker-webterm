#!/usr/bin/env bash

NAME="docker-webterm"

docker run -it -d -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock $NAME
