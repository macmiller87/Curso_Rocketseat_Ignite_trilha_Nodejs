### Comandos Docker

- `docker build -t (nome da imagem) .`   --> Cria todas as configurações da imagem o (.) indica onde está o arquivo (Dockerfile).

- `docker ps` --> Lista os containers do docker no terminal (git bash).

- `docker ps -a` --> Lista os containers que estão parados.

- `docker run -p 8080:8080 (nome da imagem)` --> Roda/start a imagem criada obs: a porta mencionada ali é um exemplo pode mudar, e (nome da imagem, não vai dentro dos parênteses, está como exemplo para todos comandos aqui).

- `docker exec -it (nome da imagem) /bin/bash` --> Comando prova e retorna que a aplicação está rodando no docker criado, como output retorna o endereço da pasta do arquivo (Dockerfile) da aplicação.

- `docker logs -f` --> Mostra os logs anteriores do container.

- `docker logs (id do container) -f` --> Mostra os logs em real time, (Id do container, não vai dentro dos parênteses, está como exemplo para todos comandos aqui).

- `docker logs (id do container)` --> Lista os logs do container em especifico.

- `docker start (id do container)` --> Inicia/start o docker.

- `docker stop (id do container)` --> Para de rodar o docker.

- `docker rm (id do container)` --> Remove o docker.


### Comandos Docker Compose

- `docker-compose up` --> Deixa o docker compose rodando em background.

- `docker-compose stop` --> Para de rodar o docker compose.

- `docker-compose start` --> Inicia/start o docker compose.

- `docker-compose down` --> Remove tudo o que foi criado dentro do docker compose, (atenção com esse comando).

