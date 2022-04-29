## Projeto Que está sendo desenvolvido durante a trilha de estudos do Curso API RENTEX.

Esse projeto é uma API de cadastro de carros, usuários e controle e aluguel de carros.
###### Está em desenvolvimento ............. 🔥🔥🚀🚀

## :white_check_mark: Requisitos Funcionais
### Cadastro de Carro
- [x] Deve ser possível cadastrar um novo carro.
### Listagem de Carros
- [x] Deve ser possível listar os carros disponíveis.
- [x] Deve ser possível listar todos os carros desponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros desponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros desponíveis pelo nome da carro.
### Cadastro de Especificação do Carro
- [x] Deve ser possível cadastrar uma especificação para um carro.
### Cadastro de Imagens do Carro
- [x] Deve ser possível cadastrar a imagem do carro.
### Aluguel de Carro
- [x] Deve ser possível cadastrar um aluguel.
### Devolução de Carro
- [x] Deve ser possível realizar a devolução de um carro.
### Listagem de Alugueis para Usuário
- [x] Deve ser possível realizar a busca de todos os alugueis para o usuário.
### Recuperar Senha
- [x] Deve ser possível o usuário recuperar a senha informando o email.
- [x] O Usuário deve receber um email com o passo a passo para a recuperação da senha.
- [x] O Usuário deve conseguir inserir uma nove senha.
## :white_check_mark: Requisitos não Funcionais
### Cadastro de Imagens do Carro
- [x] Utilizar o multer para upload dos arquivos.
## :white_check_mark: Regra de Negócio
### Cadastro de Carro
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] Não deve ser possível alterar uma placa de um carro já cadastrado.
- [x] O carro deve ser cadastrado por padrão, com disponibilidade.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
### Listagem de Carros
- [x] O usuário não precisa estar logado no sistema.
### Cadastro de Especificação no Carro
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar um especificação já existente para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
### Cadastro de Imagens do Carro
- [x] O usuário deve cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.
### Aluguel de Carro
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um aluguel, caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um aluguel, caso já exista um aberto para o mesmo carro.
- [x] O Usuário deve estar logado na aplicação.
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.
### Devolução de Carro
- [x] Se o Carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega , deverá ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.
- [x] O Usuário deve estar logado na aplicação.
### Listagem de Alugueis para Usuário
- [x] O Usuário deve estar logado na aplicação.
### Recuperar Senha 
- [x] O Usuário deve receber um email com o passo a passo para recuperação da senha.
- [x] O Link enviado para a recuperação deve expiarar em 3 horas.