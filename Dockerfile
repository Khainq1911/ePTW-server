FROM node:22.15.0-alpine3.21 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:22.15.0-alpine3.21 

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/src /app/src  
COPY --from=builder /app/yarn.lock /app/yarn.lock

RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/main.js"]
