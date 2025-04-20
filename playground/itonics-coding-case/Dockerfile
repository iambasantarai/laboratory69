FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT ["npm", "run", "fetch-and-store"]
