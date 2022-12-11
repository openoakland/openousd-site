FROM node:14-buster

WORKDIR /openousd
COPY package*.json ./

RUN npm install --global gatsby-cli@3.14.0
RUN npm install
