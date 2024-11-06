# Dockerfile

# Step 1: Use the official Node.js image as the base image
FROM node:20.18.0

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the working directory
COPY . .

# Step 6: Build the NestJS project
RUN npm run build

# Step 7: Expose the port that NestJS will run on
EXPOSE 3000

# Step 8: Start the NestJS application
CMD ["npm", "run", "start:prod"]
