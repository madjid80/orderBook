FROM node:latest

WORKDIR /tmp/server

COPY ./server.js ./
COPY ./package.json ./
COPY ./services ./services/
COPY ./utility ./utility/

RUN npm install i .
RUN npm install grenache-nodejs-ws 
RUN npm install grenache-nodejs-http

CMD node server.js