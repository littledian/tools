FROM node:12.14.0
MAINTAINER littledian 1197434548@qq.com

WORKDIR /app
COPY . .

RUN npm install --production
RUN npm run start

CMD ["npm", "start"]

EXPOSE 3000
