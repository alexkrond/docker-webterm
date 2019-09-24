#!/usr/bin/env bash

NAME="docker-webterm"

docker run -it -d -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock --name=$NAME $NAME
