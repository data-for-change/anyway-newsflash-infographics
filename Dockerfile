FROM node:13.12.0-alpine

WORKDIR /app/front/

#install app dependencides
COPY package*.json ./
RUN npm install

#add the app files itself
COPY . ./
#expose the app port
EXPOSE 3000


#start app
CMD ["npm","start"]





