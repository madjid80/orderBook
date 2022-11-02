FROM node:latest

WORKDIR /tmp/client

COPY ./client.js ./
COPY ./package.json ./
COPY ./services ./services/
COPY ./utility ./utility/


RUN npm install i .
RUN npm install grenache-nodejs-ws 
RUN npm install grenache-nodejs-http

CMD node client.js