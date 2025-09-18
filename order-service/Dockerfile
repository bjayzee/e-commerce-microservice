FROM node:22-alpine

# Update system packages securely and keep image small
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose correct port (your service runs on 3001)
EXPOSE 3003

# Start the app
CMD ["node", "index.js"]
