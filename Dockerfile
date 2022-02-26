FROM node:14-buster

WORKDIR "/openousd"

RUN npm install --global gatsby-cli
RUN npm install