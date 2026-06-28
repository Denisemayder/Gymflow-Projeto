FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . .
RUN addgroup -S gymflow && adduser -S gymflow -G gymflow
USER gymflow
EXPOSE 3000
CMD ["node", "server.js"]
