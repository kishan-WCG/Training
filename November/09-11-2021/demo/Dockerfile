FROM node:12-alpine
RUN apk add --no-cache g++ make
WORKDIR /opt/app

COPY . .

RUN npm install

CMD ["npm", "start"]