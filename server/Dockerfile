FROM node:alpine3.14 as build
WORKDIR /server
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=8080
COPY . ./
RUN npm ci --silent
EXPOSE 8080
CMD [ "node", "server.js" ]
