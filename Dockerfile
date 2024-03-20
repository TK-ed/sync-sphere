FROM node:21-alpine3.18

WORKDIR /usr/src/

COPY ./package.json /usr/src/

RUN npm i
