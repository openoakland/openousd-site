FROM node:14-buster

COPY package.json package-lock.json /openousd

WORKDIR "/openousd"

RUN npm install --global gatsby-cli@3.14.0
RUN npm install