FROM node:10.16-alpine

RUN apk update

RUN mkdir -p /awesome-api/node_modules
WORKDIR /awesome-api

COPY ./package.json ./yarn.lock ./
COPY . .

RUN yarn install
RUN yarn global add pm2
RUN yarn global add tsoa

EXPOSE 3000

CMD [ "yarn", "start:dev" ]