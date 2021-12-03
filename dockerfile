FROM node:17-alpine3.12

WORKDIR /app

COPY  package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]