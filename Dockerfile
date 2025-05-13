# 1. Imagen base
FROM node:22-alpine

# 2. Directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código (incluye prisma/)
COPY . .

# 6. Generar el cliente Prisma
RUN npx prisma generate

# 7. Exponer puerto
EXPOSE 3000

# 8. Comando de inicio
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run start:dev"]
