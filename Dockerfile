FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_KEY

ENV TASTY_API_KEY=''

RUN npm run build 

EXPOSE 4321

CMD ['npm', 'run', 'preview', '--', '--host']