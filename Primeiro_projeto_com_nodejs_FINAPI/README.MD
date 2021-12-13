## FinAPI - Financeira

- Nessa aplicação foi feita uma API, que simula a operação de um banco real, com todos so critérios e regras de negócio mencionados abaixo.
- Foi utilizado o Nodejs/javascript como linguagem para desenvolver o Backend.
- framework/biblioteca Express, UUID, Nodemon.
- Foi utilizado a ferramenta/software Insominia para trabalhar com as requisições HTTP.

### Requisitos

- [x] Deve ser possível criar uma conta.
- [x] Deve ser possível buscar o extrato bancário do cliente.
- [x] Deve ser possível realizar um depósito.
- [x] Deve ser possível realizar um saque.
- [x] Deve ser possível buscar o extrato bancário do cliente por data.
- [x] Deve ser possível atualizar dados da conta do cliente.
- [x] Deve ser possível obter dados da conta do cliente.
- [x] Deve ser possível deletar uma conta.
- [x] Deve ser possível retornar o balance


## Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente.
- [x] Não deve ser possível buscar extrato em uma conta não existente.
- [x] Não deve ser possível fazer depósito em uma conta não existente.
- [x] Não deve ser possível fazer saque em uma conta não existente.
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente.
- [x] Não deve ser possível excluir uma conta não existente. 