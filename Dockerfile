# Base image
FROM node:20.11-slim

# Create app directory
WORKDIR /usr/src/app

# OpenSSL ve diğer gerekli paketleri kur
RUN apt-get update -y && \
    apt-get install -y \
    openssl \
    libssl-dev \
    ca-certificates \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Copy prisma schema first
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Bundle app source
COPY . .

# Copy the .env files
COPY .env* ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port
EXPOSE 3000

# Modify the start command to ensure Prisma migrations run first
CMD sh -c "npx prisma migrate deploy && npm run start:prod"