FROM node:18-alpine

# RUN mkdir -p /usr/src/app
WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8085

CMD ["npm", "start"]
