FROM node:18-alpine
# Instala utilitários necessários, como o openssl e compatibilidade com libc
RUN apk add --no-cache openssl libc6-compat
WORKDIR /usr/app
ENV NODE_ENV=development

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências (incluindo Prisma Client e Nodemon)
RUN npm install

# Copia o schema do Prisma (para cache inteligente)
COPY prisma ./prisma/

# Gera o cliente Prisma
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Expõe a porta 3002
EXPOSE 3002

# Comando de inicialização usando Nodemon para desenvolvimento
CMD ["npm", "run", "dev"]