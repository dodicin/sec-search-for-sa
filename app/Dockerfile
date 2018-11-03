FROM node:8

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE 1010

CMD [ "npm", "start" ]
