# Imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o package.json para instalar as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]