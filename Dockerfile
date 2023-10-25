FROM node:18-alpine

WORKDIR /usr/src/app
ENV PATH  /usr/src/app/node_modules/.bin:$PATH
COPY package.json ./
ENV NODE_ENV=development
# RUN npm install -g npm@latest
RUN npm install 
RUN npm install -g typescript
RUN npm install -g nodemon
RUN npm install rimraf
RUN npm install -g sequelize-cli
COPY . . 
EXPOSE 8000

CMD [ "npm", "run", "ts:dev" ]
