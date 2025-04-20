# ---------- stage 1: build the application ---------- #
FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm run build

# ---------- stage 2: final image for production ---------- #
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the build artifact files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

ENTRYPOINT ["npm", "run", "fetch-and-store"]
