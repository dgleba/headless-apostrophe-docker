FROM node:8

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app
RUN npm install --registry=https://registry.npmjs.org/

# Mount persistent storage
VOLUME /app/data
VOLUME /app/public/uploads

EXPOSE 3000
CMD [ "npm", "run", "build" ]
