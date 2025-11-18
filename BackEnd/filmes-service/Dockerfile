# Imagem base do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /usr/app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o schema do Prisma antes (para cache inteligente)
COPY prisma ./prisma/

# Gera o cliente Prisma
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Expõe a porta da aplicação
EXPOSE 3001

# Comando de inicialização (melhor usar "start" em produção)
CMD ["npm", "run", "dev"]
