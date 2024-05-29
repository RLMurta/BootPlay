# BootPlay

# Backend
## Descrição
Projeto backend desenvolvido em Java usando Spring Boot. O projeto consiste 
em criar uma API RESTful para um programa de fidelidade baseado em pontos
de um e-commerce de discos de vinil.

## Como executar
Primeiro é necessário clonar o projeto. Para isso, basta executar o comando
`git clone https://github.com/bc-fullstack-04/rafael-murta-backend.git`

Depois de clonar o projeto, é necessário entrar na pasta do projeto. 

### Caso não sejam feitas alterações
Para executar o projeto, é necessário ter o Docker instalado. Com o Docker
instalado, basta executar o comando `docker-compose -f docker-compose.yml up -d` 

### Caso sejam feitas alterações
Com o IntelliJ edite as configurações de execução e adicione a opção de VM e preencha`-Dspring.profiles.active=dev`.

Para executar o projeto, é necessário ter o Docker instalado. Com o Docker
instalado, basta executar o comando `docker-compose -f docker-compose.yml build`
e depois `docker-compose -f docker-compose.yml up -d` 
na raiz do projeto. O Docker irá baixar as imagens necessárias e subir os 
containers do projeto.

Caso haja erro, dê clean e install no life cycle do projeto e tente novamente.

## Importante
Na primeira vez que for rodar a aplicação backend, será necessário alterar as credenciais spotify localizadas no arquivo `backend/app-integration-api/src/main/java/br/com/sysmap/bootcamp/domain/service/integration/SpotifyApi.java` onde o código 
`private se.michaelthelin.spotify.SpotifyApi 
            spotifyApi = new se.michaelthelin.spotify.SpotifyApi
            .Builder()
            .setClientId("INSERT_YOUR_CLIENT_ID")
            .setClientSecret("INSERT_YOUR_CLIENT_SECRET")
            .build();`
está localizado. Para conseguir essas credenciais, acesse o site https://developer.spotify.com/documentation/web-api crie uma conta, acesse o dashboard e crie um projeto que deve ter a permissão WebApi. Ainda dentro do dashboard você conseguirá pegar o seu client id e seu client secret, substitua eles no código acima.

## Documentação
Após o projeto ser executado, é possível acessar a documentação da API através
de um navegador.

A documentação da user API pode ser acessada através do link:
http://localhost:8081/api/swagger-ui/index.html#/

A documentação da integration API pode ser acessada através do link:
http://localhost:8082/api/swagger-ui/index.html#/

A página do RabbitMQ pode ser acessada através do link:
http://localhost:15672/#/
Usuário e senha padrão = guest

# Frontend
## Descrição
Projeto frontend desenvolvido em React usando TypeScript, Vite, Tailwind, Shadcn/ui. O projeto consiste 
em criar um Website responsível para um e-commerce de discos de vinil.

## Como executar
Primeiro é necessário clonar o projeto. Para isso, basta executar o comando
`git clone https://github.com/bc-fullstack-04/rafael-murta-frontend.git`

Após isso, será necessário rodar o projeto React, com o comando
`npm run dev`

## Documentação
O website pode ser acessado através do link:
http://localhost:5173/
