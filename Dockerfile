# Dockerfile for package.json
# Stage 1: Build application assets and dependencies
FROM node:20-alpine AS builder

# Set working directory and copy package manifests
WORKDIR /app
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install

# Copy all source files
COPY . .

# Build production assets using Vite
RUN npm run build

# Stage 2: Create optimized production image
FROM node:20-alpine

# Set working directory and copy package manifests
WORKDIR /app
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy essential backend files
COPY server.js .
COPY config ./config
COPY routes ./routes
COPY src/socket.js ./src/socket.js

# Expose default Express port
EXPOSE 3000

# Start production server
CMD ["node", "server.js"]