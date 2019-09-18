#!/usr/bin/env bash

apt-get update

apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_10.x | bash -

apt-get install -y nodejs build-essential wget nano
wget -O - https://get.docker.com | bash -

npm install
