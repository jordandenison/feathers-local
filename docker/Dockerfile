FROM node:20.9-alpine3.18
MAINTAINER Jordan Denison <jordan@denisonweb.com>

RUN npm install --location=global npm@10.5.2 @feathersjs/cli && \
    mkdir -p /usr/src/cache /usr/src/app && \
    chown -R node:node /usr/src/app

WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./

RUN chown -R node:node /usr/src/cache

USER node

RUN npm install

WORKDIR /usr/src/app