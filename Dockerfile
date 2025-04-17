# Use Node.js base image
FROM node:current-alpine3.10

# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Expose the app port
EXPOSE 3000

# Run dev script with nodemon
CMD ["npm", "run", "dev"]
