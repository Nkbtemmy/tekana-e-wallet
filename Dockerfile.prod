FROM node:18 AS build
WORKDIR /app
RUN npm install -g npm@latest
COPY package.json ./
RUN npm install 
RUN npm install -g typescript
RUN npm install -g nodemon
RUN npm install rimraf
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
RUN npm install --omit=dev
CMD ["npm", "run", "start"]