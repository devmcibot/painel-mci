FROM node:20-alpine
WORKDIR /app

# 1) Instala as dependências
COPY package.json package-lock.json* ./
RUN npm ci

# 2) Prisma client
COPY prisma ./prisma
RUN npx prisma generate

# 3) Copia o restante do código e faz o build standalone do Next
COPY . .
RUN npm run build

# 4) expõe e inicia
ENV PORT=3000
EXPOSE 3000

# 5) aplica migrações e inicia o Next standalone
CMD npx prisma migrate deploy && node .next/standalone/server.js
