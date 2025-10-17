FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY . /app
EXPOSE 3000
CMD ["http-server","-p","3000","-c-1"]
