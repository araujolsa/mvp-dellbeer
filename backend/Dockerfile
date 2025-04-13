# Use a imagem base oficial do Python
FROM python:3.11

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos da API para dentro do container
COPY . /app

# Instala as dependências
RUN pip install --no-cache-dir flask flask-cors

# Expõe a porta padrão usada pela API
EXPOSE 5000

# Comando para iniciar o Flask
CMD ["python", "app.py"]
