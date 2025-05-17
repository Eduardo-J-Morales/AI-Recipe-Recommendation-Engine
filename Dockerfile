FROM caddy:alpine

RUN apk update && apk add --no-cach nodejs npm 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN cp -r dist/* /srv/

COPY ./Caddyfile /etc