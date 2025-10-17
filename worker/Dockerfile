FROM node:18-alpine
WORKDIR /usr/src/worker
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "worker.js"]
