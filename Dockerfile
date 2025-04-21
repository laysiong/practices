# Stage 1: Build
FROM node:lts-alpine

WORKDIR /app

# Only copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --progress --verbose

# Then copy the rest of the app
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
