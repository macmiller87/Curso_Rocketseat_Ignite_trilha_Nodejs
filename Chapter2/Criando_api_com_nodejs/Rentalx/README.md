## Projeto Que está sendo desenvolvido durante a trilha de estudos do Curso API RENTEX.

Esse projeto é uma API de cadastro de carros, usuários e controle e aluguel de carros.
###### Está em desenvolvimento ............. 🔥🔥🚀🚀

## :white_check_mark: Requisitos Funcionais
### Cadastro de Carro
- [x] Deve ser possível cadastrar um novo carro.
### Listagem de Carros
- [] Deve ser possível listar os carros disponíveis.
- [] Deve ser possível listar todos os carros desponíveis pelo nome da categoria.
- [] Deve ser possível listar todos os carros desponíveis pelo nome da marca.
- [] Deve ser possível listar todos os carros desponíveis pelo nome da carro.
### Cadastro de Especificação do Carro
- [] Deve ser possível cadastrar uma especificação para um carro.
- [] Deve ser possível Listar todas as especificações.
- [] Deve ser possível listar todos os carros.
### Cadastro de Imagens do Carro
- [] Deve ser possível cadastrar a imagem do carro.
- [] Deve ser possível listar todos os carros.
### Aluguel de Carro
- [] Deve ser possível cadastrar um aluguel.
## :white_check_mark: Requisitos não Funcionais
### Cadastro de Imagens do Carro
- [] Utilizar o multer para upload dos arquivos.
## :white_check_mark: Regra de Negócio
### Cadastro de Carro
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [] Não deve ser possível alterar uma placa de um carro já cadastrado.
- [x] O carro deve ser cadastrado por padrão, com disponibilidade.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
### Listagem de Carros
- [] O usuário não precisa estar logado no sistema.
### Cadastro de Especificação no Carro
- [] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [] Não deve ser possível cadastrar um especificação já existente para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
### Cadastro de Imagens do Carro
- [] O usuário deve cadastrar mais de uma imagem para o mesmo carro.
- [] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Aluguel de Carro
- [] O aluguel deve ter duração mínima de 24 horas.
- [] Não deve ser possível cadastrar um aluguel, caso já exista um aberto para o mesmo usuário.
- [] Não deve ser possível cadastrar um aluguel, caso já exista um aberto para o mesmo carro.
