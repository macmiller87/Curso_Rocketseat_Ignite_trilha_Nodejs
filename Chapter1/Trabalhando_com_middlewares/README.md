# Projeto API TODO versão 2 Trabalhando com Middlewares 

- Essa versão foi incluida algumas funcionalidades novas, para treinar e aperfeiçoar o uso das Funções Middlewares no Node.js .

# Resumo da aplicação

- Nessa aplicação foi feita uma API, que é uma gerador de tarefas TODOS, onde o usúario pode cadastrar um name e um username, e a aplicação gera um ID para esse usúario, pegando também o horário automáticamente no sistema.
- O usúario também pode craiar a sua lista de tarefas TODO, também é possível alterar o title, deadline e o status da tarefa para true, o usuário para Pro, para conseguir cadastrar mais de 10 tarefas com o mesmo usuário.
- o usúario também pode deletar o TODO, criar mais TODOS e etc. 

## Ferramentas 

- Foi utilizado o Nodejs/javascript como linguagem para desenvolver o Backend.
- framework/biblioteca Express, UUID, Cors e Nodemon.
- Foi utilizado o Jest/Supertest para rodar os scripts dos testes unitários das funções Middlewares no terminal.
- Foi utilizado a ferramenta/software Insomnia para trabalhar com as requisições HTTP.

## Requisitos

- [x] Deve ser possível cadastrar um name e um username.
- [x] Deve ser possível listar todas as tarefas do usúario.
- [x] Deve ser possível criar uma lista de tarefas (TODO).
- [x] Deve ser possível alterar o usuário para um usuário (Pro).
- [x] Deve ser possível Atualizar os dados da lista de tarefas criada, (title) e (deadline) que possua o mesmo ID da tarefa (TODO). 
- [x] Deve ser possível Atualizar os dados da lista de tarefas criada, o status (done) que possuir o mesmo ID da tarefa (TODO). 
- [x] Deve ser possível deletar a lista de tarefas que possua o mesmo ID.



## Regras de negócio

- [x] Não deve ser possível cadastrar um name e um username já existente.
- [x] Não deve ser possível listar as tarefas de um usúario que não existe.
- [x] Não deve ser possível Atualizar os dados da lista de tarefas criada, (title) e (deadline) que não possuir o mesmo ID da tarefa (todo) criada. 
- [x] Não deve ser possível Atualizar os dados da lista de tarefas criada, o status (done) que não possuir o mesmo ID da tarefa (todo) criada.
- [x] Não deve ser possível deletar a lista de tarefas que não possuir o mesmo ID da tarefa (todo) criada.