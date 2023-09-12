FROM node:18.17.1-alpine

USER node
WORKDIR /app

COPY --chown=node . .
# RUN yarn install && yarn cache clean
# RUN yarn install --frozen-lockfile --production && yarn cache clean
RUN yarn install --immutable --immutable-cache && yarn cache clean

CMD ["yarn", "start"]
