FROM node:14-alpine as development

WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . .

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0","./index.js" ]

FROM node:14-alpine as production

WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install
# Bundle app source
COPY . .
CMD [ "npm", "start" ]

