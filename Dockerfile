FROM node:22.0.0-alpine

WORKDIR /app/front/

#install app dependencides
COPY package*.json ./
RUN npm install

#add the app files itself
COPY . ./
#expose the app port
EXPOSE 3000

RUN npx update-browserslist-db@latest
#start app
RUN npx browserslist@latest --update-db
CMD ["npm","start"]





