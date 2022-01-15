# build stage
FROM node:12-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
        python3 py-pip \
        make \
        g++ \
    && npm install \
    && apk del .gyp

COPY . .

RUN npm run build:docker


# production stage
FROM nginx:stable-alpine as production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
