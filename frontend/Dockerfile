FROM node:14.17.0
ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install -g @angular/cli@12.2.16
RUN npm install --silent
COPY . .
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

#docker build -t frontend:1.0 .
#docker run -p 4200:4200 frontend:1.0
 