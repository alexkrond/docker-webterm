#!/usr/bin/env bash

apt update

apt install -y curl
curl -sL https://deb.nodesource.com/setup_10.x | bash -

apt install -y nodejs build-essential wget nano
wget -O - https://get.docker.com | bash -

npm install
