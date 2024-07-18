# Use an official Node.js runtime as a parent image
FROM node:18.18-bookworm-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json to the container
COPY package*.json ./

RUN apt-get update && \
    apt-get install python3 python3-venv -y 

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Define the command to run your Node.js application
CMD ["npm", "run", "dev"]
