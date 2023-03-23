FROM node:19-alpine AS build

ENV NODE_ENV production

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY .eslintrc.json .prettierrc tsconfig.json /app/

COPY ./ /app/

RUN yarn run build

FROM nginx:stable-alpine as production

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
