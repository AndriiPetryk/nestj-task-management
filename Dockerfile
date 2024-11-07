# Use the Node.js image as the base
FROM node:20.18.0

WORKDIR /app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt-get remove -y build-essential python3 && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

