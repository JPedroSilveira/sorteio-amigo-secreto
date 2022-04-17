FROM node:alpine3.14 as build
WORKDIR /server
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=80
COPY . ./
RUN npm ci --silent
EXPOSE 80
CMD [ "node", "server.js" ]
