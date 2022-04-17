FROM node:alpine3.14 as build
WORKDIR /server
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm ci --silent
CMD [ "node", "server.js" ]
