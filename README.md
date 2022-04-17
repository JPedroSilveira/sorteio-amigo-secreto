# Sorteio Amigo Secreto

Gerencie seu amigo secreto de forma simples e rápida!

## Aplicativos

- app: aplicativo web em ReactJS
- api: servidor em NodeJS

## Execute os aplicativos individualmente!

Cada aplicativo possui seu próprio README.md com instruções de execução.

## Deploy to Heroku

- Crie dois aplicativos no [Heroku](https://dashboard.heroku.com/), um para o app e outro para o server
- Modifique o arquivo server/cors.interceptor.js com o endereço do app
- Modifique o arquivo app/src/constants/api.constants.js com o endereço do server
- Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Instale o [Docker](https://www.docker.com/)
- Faça login no Heroku Container:
  - `heroku container:login`
- Abre o `app` ou o `server`
- Crie uma imagem e envie para o Heroku
  - `heroku container:push web -a {nome do aplicativo}`
- Faça o deploy da aplicação
  - `heroku container:release web -a {nome do aplicativo}`
- Abra a aplicação no seu navegador
  - `heroku open`
