FROM node:18-alpine

# WORKDIR /src
# COPY package.json package-lock.json /src/
# RUN npm install --development


# Will create a directory app and switch to that directory
WORKDIR /app
# Copies package.json file to /app directory
COPY package*.json ./
# Runs npm install to create node_modules for your app
RUN npm install --silent
# Copies the source code to /app directory
COPY . .

# Build React app
RUN npm run build

# COPY . /src

EXPOSE 5173

CMD ["npm", "run", "dev"]
