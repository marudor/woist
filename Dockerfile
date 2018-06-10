FROM node:10-alpine as build
WORKDIR /app
COPY .babelrc.js .babelrc.js
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY src src
ENV NODE_ENV production
RUN yarn build


FROM node:10-alpine
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY index.js index.js
COPY --from=build /app/lib /app/lib
ENV NODE_ENV production
RUN yarn --prod
CMD ["node", "index.js"]
