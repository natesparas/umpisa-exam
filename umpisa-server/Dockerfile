FROM node:18-alpine

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install --development

COPY . /src

EXPOSE 8085

CMD ["npm", "start"]
