#!/usr/bin/env bash

FILE_NAME="Dockerfile"
IMAGE_NAME="docker-webterm"

docker build -f $FILE_NAME -t $IMAGE_NAME ./
