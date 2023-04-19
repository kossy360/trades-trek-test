FROM node:lts AS builder
WORKDIR /app
ARG API_BASE_URL
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY package.json package.json
COPY .yarn/cache .yarn/cache/
COPY .yarn/releases .yarn/releases/
COPY .yarn/plugins .yarn/plugins/
COPY .yarnrc.yml .yarnrc.yml
RUN yarn install
COPY .eslintrc.json .eslintrc.json
COPY tsconfig.json tsconfig.json
COPY next.config.js next.config.js
COPY public public
COPY src src
CMD ["yarn", "dev"]
RUN yarn build


FROM builder AS final
WORKDIR /app
ARG API_BASE_URL
ENV API_BASE_URL ${API_BASE_URL}
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
CMD ["yarn", "start"]
