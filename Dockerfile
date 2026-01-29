FROM node:20.18.0-alpine3.20

# Establecer la zona horaria
ENV TZ=America/Guayaquil

RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar archivos del proyecto (incluyendo public/)
COPY . .

# Construir la aplicación
RUN npm run build

# npx @better-auth/cli generate ## or (migrate)
# RUN npx @better-auth/cli generate

RUN npx @better-auth/cli migrate -y



# Verificar que los archivos estáticos se copiaron correctamente
RUN ls -la .next/static/ && echo "Verificando archivos estáticos..."

# Exponer el puerto 3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]
