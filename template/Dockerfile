FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i
COPY .env /app/.env

RUN npm run build
EXPOSE 5173

CMD ["node", "--env-file=.env", "build"]
