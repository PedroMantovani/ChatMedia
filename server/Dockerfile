FROM node:18-slim


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm audit fix --force

ENV STRING_CONNECTION_DB "mongodb+srv://chatmedia:nygYrdACTIX73vn2@cluster0.zdl147a.mongodb.net/ChatMedia?retryWrites=true&w=majority"
ENV JWT_KEY "CHAT"

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]