# Dockerfile
FROM node:21

WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json .

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE ${EXTERNAL_PORT_CLIENT_SERVICE}

# Definir las variables de entorno para la conexión a la base de datos
# DB de posgre
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_HOST=${DB_HOST}

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
