FROM node:18.17.1-alpine

USER node
WORKDIR /app

COPY --chown=node . .

RUN yarn install --immutable --immutable-cache

# FIXME: Don't use 'yarn start' in prodKubernetes.
# It can mess the SIGTERM and SIGKILL signals
CMD ["yarn", "start"]
