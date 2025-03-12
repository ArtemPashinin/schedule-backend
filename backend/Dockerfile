# Этап сборки
FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
