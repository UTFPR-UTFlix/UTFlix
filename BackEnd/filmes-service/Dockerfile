    FROM node:18-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]
