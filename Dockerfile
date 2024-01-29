# Use an official Node.js image as a base for building the Angular app
FROM node:latest AS builder

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

RUN npm install -g npm@latest

RUN npm config set registry https://registry.npmjs.org/
# Install dependencies
RUN npm install --force --timeout=60000

# Copy the Angular app source code to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Use an official Nginx runtime as a base image
FROM nginx:latest

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static content
RUN rm -rf ./*

# Copy the compiled Angular app files from the builder stage to the Nginx image
COPY --from=builder /usr/src/app/dist/* .

# Configuration to enable Nginx to run properly inside Docker
# COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Define the command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]