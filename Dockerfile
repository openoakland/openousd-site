FROM node:14-bullseye

WORKDIR /openousd
COPY package*.json ./

RUN npm install --global gatsby-cli@3.14.0
RUN npm install
