FROM node:18
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./index.js ./
COPY ./config.js ./ 
COPY ./src ./src
COPY ./.env ./
CMD ["npm", "start"]