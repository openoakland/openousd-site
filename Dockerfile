FROM node:14-buster

RUN npm install --global gatsby-cli
RUN npm install

WORKDIR "/openousd"

CMD ["/bin/bash"]