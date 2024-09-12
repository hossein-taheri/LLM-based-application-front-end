FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @quasar/cli

RUN npm install

COPY . .

EXPOSE 9000

CMD ["quasar", "dev", "--hostname", "0.0.0.0"]
