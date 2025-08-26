# Multi-stage build for Angular application

# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including Angular CLI
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the previous stage
# Based on Angular 15 default output path
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx-proxy.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
