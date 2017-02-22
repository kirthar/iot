# Create image based on the official Node latest image from Dockerhub
FROM node:latest

LABEL vendor=Kirthar \
  com.iot.is-beta=true \
  com.iot.is-production="" \
  com.iot.version="0.0.1-alpha"

# Change directory so that our commands run inside this new directory
WORKDIR /web

# Copy dependency definitions
COPY package.json /web

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /web

# Expose the port the app runs in
EXPOSE  4200

# Serve the app
CMD [ "npm", "start" ]


