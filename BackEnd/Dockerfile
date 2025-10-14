# Imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copia o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências da aplicação
# Isso fica em um passo separado para aproveitar o cache do Docker
RUN npm install

# Copia o schema do Prisma primeiro para otimizar o cache
COPY prisma ./prisma/

# Gera o cliente Prisma - ESTA É A CORREÇÃO PRINCIPAL
RUN npx prisma generate # <--- ADICIONADO

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]