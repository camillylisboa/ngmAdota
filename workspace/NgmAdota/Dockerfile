FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y

# Definir o diretório de trabalho para o diretório do backend
WORKDIR /workspace/NgmAdota

COPY . .

# Instalar Maven
RUN apt-get install maven -y

# Executar o Maven dentro do diretório correto onde o pom.xml está localizado
RUN mvn clean install

FROM openjdk:17-jdk-slim
EXPOSE 8080

# Copiar o arquivo .jar gerado para o novo container
COPY --from=build /workspace/NgmAdota/target/NgmAdota-1.0.0.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
