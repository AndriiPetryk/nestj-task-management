# Use the Node.js image as the base
FROM node:20.18.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install && npm rebuild bcrypt --build-from-source

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "start:dev"]
