# Etapa 1: Build da aplicação
FROM node:18 as build

WORKDIR /app

# Copia os arquivos do projeto React
COPY . .

# Instala as dependências e faz build
RUN npm install
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove a configuração default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados do React para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia uma config personalizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
