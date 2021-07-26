FROM node:14-alpine as build

WORKDIR /usr/workspace/half-jokes

COPY ./ ./
RUN yarn
RUN yarn build

FROM node:14-alpine

WORKDIR /usr/app/stance-api
COPY --from=build /usr/workspace/half-jokes ./

EXPOSE 3000
CMD ["yarn", "start:prod"]
