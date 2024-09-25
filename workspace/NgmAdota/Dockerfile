FROM ubuntu:latest AS build

# Atualizar pacotes e instalar o JDK
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

# Definir o diretório de trabalho para a pasta do backend
WORKDIR /workspace/NgmAdota

# Copiar apenas a pasta do backend para o container
COPY ./workspace/NgmAdota /workspace/NgmAdota

# Instalar o Maven
RUN apt-get install maven -y

# Rodar o Maven dentro do diretório correto onde o pom.xml está localizado
RUN mvn clean install

# Construir a segunda imagem baseada no JDK slim
FROM openjdk:17-jdk-slim
EXPOSE 8080

# Copiar o arquivo .jar gerado para o novo container
COPY --from=build /workspace/NgmAdota/target/NgmAdota-1.0.0.jar app.jar

# Executar o jar
ENTRYPOINT ["java", "-jar", "app.jar"]
