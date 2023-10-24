FROM node:16

WORKDIR /usr/src/movasagh-customer

ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --ignore-engines

COPY ./ ./

RUN yarn build
RUN ["chmod", "+x", "/usr/src/movasagh-customer/docker-entrypoint.sh"]
ENTRYPOINT ["/usr/src/movasagh-customer/docker-entrypoint.sh"]


CMD ["yarn", "run", "dev"]
