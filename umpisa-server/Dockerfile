FROM node:18-alpine

WORKDIR /src

# Copying all the files in our project
COPY . .

RUN npm install

EXPOSE 8085

CMD ["npm", "start"]
