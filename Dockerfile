FROM node:boron-slim

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install node modules
COPY package*.json /app/
RUN cd /app && npm install --registry=https://registry.npmjs.org/ --only=production

# Install application
COPY dist /app

# Mount persistent storage
VOLUME /app/data
VOLUME /app/public/uploads

EXPOSE 3000
CMD [ "npm", "start" ]
