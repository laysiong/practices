# Stage 1: Build
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --progress --verbose

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
