# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci 

COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production runtime
FROM node:lts-alpine 

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD [ "npm", "start" ]
