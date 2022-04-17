FROM node:alpine3.14 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm ci --silent
RUN npm run build

FROM node:alpine3.14
WORKDIR /app
COPY --from=build /app/build ./build
WORKDIR /app/host
COPY host ./
RUN npm ci --silent
WORKDIR /app
CMD [ "node", "host/host.js" ]