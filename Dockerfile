# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

# Only copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm ci --progress --verbose

# Then copy the rest of the app
COPY . .

# Build the app (e.g., Next.js, React, etc.)
RUN npm run build

# Stage 2: Production
FROM node:lts-alpine AS production

WORKDIR /app

# Copy only necessary build output and dependencies from builder
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
