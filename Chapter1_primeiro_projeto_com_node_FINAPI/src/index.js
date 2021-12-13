const express = require('express');
const { v4: uuidv4 } = require("uuid"); // Aqui está sendo requirido o pacote uuid para gerar id único, o (v4) gera id randomicos. 

const app = express();

app.use(express.json()); // Aqui está sendo setado a função use(express.json() , para poder a aplicaçõa receber os dados via JSON.


/*
cpf - string
name string
id - uuid
statement: []
*/
const customers = []; // Array de dados dos clientes

// Middleware --> Método para verificação, não deve ser possível buscar extrato em uma conta não existente, não deve ser possível fazer depósito em uma conta não existente, e não deve ser possível excluir uma conta não existente, essa verificação e feita pelo cpf.
function verifyIfExistsAccountCPF(req, res, next) { // Essa função acaso retornar false, está sendo passada para o app.get() para continuar o fluxo.

    const { cpf } = req.headers;
    const customer = customers.find((customer) => customer.cpf === cpf);

    if(!customer) {

        return res.status(400).json({error: "Customer not found"}); 
    }

    req.customer = customer; // Aqui está sendo requerido o customer, do app.get() .

    return next();
}


// Essa função verifica se o saldo é positivo ou negativo.
function getBalance(statement) {

    const balance = statement.reduce((acc, operation) => { // Aqui está sendo usado a função reduce() e sendo passado 2 parametros, (operation) --> para controlar o saldo da conta, e o (acc) para ser um acumulador do saldo da conta nas operações de credito e debito.

        if(operation.type === 'credit') {
            return acc + operation.amount;

        }else {
            return acc - operation.amount;

        }

    }, 0); // Aqui está sendo setatdo o valor do acc, que começa em 0.

    return balance;
}

//app.use(verifyIfExistsAccountCPF); // Aqui esta sendo passado a função acima, nesse método app.use(), seria para a função acima que é um middleware, tudo oq está abaixo dessa linha iria passar pela verificação da função, se acaso ela retorna-se false, ai o fluxo segue para oq está abaixo.

// Método para criação de conta, e metodo para não poder ser possível cadastrar uma conta com CPF já existente.
app.post("/account", (req, res) =>{

    const { cpf, name } = req.body; // Método padrão para inserir dados (.body) .

    // Aqui está sendo usado a função some() que vai fazer a verificação do dado dentro do  array customers
    const customerAlredyExistis = customers.some((customer) => customer.cpf === cpf);

    // Aqui se a função acima retornar true; ou dado já exitir, então vai ser retornado um JSON com a msg setada.
    if(customerAlredyExistis) {
        return res.status(400).json({error: "Customers already exists!"}); 
    }


    customers.push({ // Aqu vai ser pego cada dado e colocado dentro do array costumers.

        cpf,
        name,
        id: uuidv4(), // aqui está sendo chamado a função (uuidv4), que vai gerar os id's.
        statement: [], // Aqui é um array para guardar as informações da movimentação da conta, o extrato.

    });

    return res.status(201).send(); // Aqui está sendo setado o parametro res.status(201).send() , para que não vai retornar nehuma informação, ele só vai mostrar que foi criado o dado pelo status(201) o status(201) e para quando o dado foi criado com sucesso.

});


// Método para buscar o extrato bancário do cliente, e método para não ser possível buscar o extrato em uma conta não existente.
app.get("/statement", verifyIfExistsAccountCPF, (req, res) => { // Aqui foi passado o tipo de parametro (Route Params) através do :cpf, que vai ser o identificador -->  app.get("/statement/:cpf" // Seria esse formato se fosse usar a funçã (params).

    // const { cpf } = req.headers; //  Aqui está sendo usado a função (headers) que não é necessario passar o id, que no caso seria o cpf, ele vai buscar o dado pelo cabeçario/header.

    // // const { cpf } = req.params; // Aqui está sendo usado a função (params) obrigatorio pela definição que foi passada acima, para poder pegar o dado so cpf.
    // // app.get("/statement/:cpf" // Seria esse formato se fosse usar a funçã (params).

    // const customer = customers.find(customer => customer.cpf === cpf); // aqui esta sendo usado a função (find) para procurar dentro do array customers, se tem o cpf igual.


    // // Aqui se não tiver encontrado o dado acima, ele vai cair nesse if, e setar esse msg de erro pelo JSON.
    // if(!customer) {

    //     return res.status(400).json({error: "Customer not found"}); 
    // }

    const { customer } = req; // Aqui está sendo desetruturado o customer e colocado nessa const, para passar como parametro para a função middleware, nessa linha --> req.customer = customer;

    return res.json(customer.statement); // Aqui vai retornar o statement em JSON que é o dado do array customers.

});


// Método para realizar um depósito.
app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {

    const { description, amount } = req.body;
    const { customer } = req; // Aqui está sendo requerido o customer, que está sendo verificado e tartado no app.post().

    // Aqui está sendo criada a operação de credito, com os parâmetros necessários
    const statementOperation = {

        description,
        amount,
        created_at: new Date(), // Aqui vai verificar a data da crição da conta com a função new date().
        type: "credit" // Aqui é o tipo do depósito, aqui no caso só tem a opção de credit, mas poderia ter mais.
    };

    customer.statement.push(statementOperation); // Aqui está sendo inserido dentro as informações da const statementOperation dentro do array customer.

    return res.status(201).send(); // Aqui está sendo enviado peal função send() o status(201) se tudo der certo.
});


// Método para fazer o saque, e método que não deve ser possível fazer saque quando o saldo for insuficiente.
app.post("/withdraw", verifyIfExistsAccountCPF, (req, res) => {

    const { amount } = req.body; // Aqui está sendo recuperado o valor do depósito.
    const { customer } = req; // Aqui está sendo recuperado os dados os dados do cpf, que está sendo verificado no método function verifyIfExistsAccountCPF.

    const balance = getBalance(customer.statement); //  Aqui está sendo passado a função getBalance com toda operação de verificação dela, para esta const balance.

    if(balance < amount) {
        return res.status(400).json({error: "Insufficiente funds!" });
    }

    // Aqui está sendo criada a operação de debito, com os parâmetros necessários
    const statementOperation = {

        amount,
        created_at: new Date(), // Aqui vai verificar a data da crição da conta com a função new date().
        type: "debit",
    };

    customer.statement.push(statementOperation); // Aqui está sendo passado para o customer as informações do statementOperation
    return res.status(201).send(); 

});


// Método busca o extrato bancário por data.
app.get("/statement/date", verifyIfExistsAccountCPF, (req, res) => { 


    const { customer } = req; // Aqui está sendo desetruturado o customer e colocado nessa const, para passar como parametro para a função middleware, nessa linha --> req.customer = customer;

    const { date } = req.query; // Aqui está sendo usado a função (query), que é usada para listar tipos de dados, nesse caso as datas.

    const dateFormat = new Date(date + " 00:00"); // Aqui está sendo recuperada a data da transação e formatada com essa mascara 00:00, para poder recuper qualquer horário.

    const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString()); // Aqui está sendo comparado se a data que foi pega no customer, é igual a data formatada acima no dateFormat. 


    return res.json(statement); // Aqui vai retornar o statement acima com a data formatada no JSON.

});


// Método para atualizar os dados da conta do cliente.
app.put("/account", verifyIfExistsAccountCPF, (req, res) => {

    const { name } = req.body; // Aqui está sendo recuperado o nome.
    const { customer } = req; // // Aqui está sendo recuperado os dados os dados do cpf, que está sendo verificado no método function verifyIfExistsAccountCPF.

    customer.name = name;

    return res.status(201).send();
});


// Método para obter os dados do cliente
app.get("/account", verifyIfExistsAccountCPF, (req, res) => {

    const { customer } = req; // Aqui está sendo recuperado os dados os dados do cpf, que está sendo verificado no método function verifyIfExistsAccountCPF.

    return res.json(customer); // Aqui vai retornar o customer acima no JSON.

});


// Método para deletar a conta, e não deve ser possível excluir uma conta não existente.
app.delete("/delete/account", verifyIfExistsAccountCPF, (req, res) => {

    const { customer } = req; // Aqui está sendo recuperado os dados os dados do cpf, que está sendo verificado no método function verifyIfExistsAccountCPF.

    customers.splice(customer, 1); // Aqui está sendo usado a função splice() que remove um valor dentro de um array, nesse caso o customer que recebe o array customers, onde guarda as informações da conta.

    return res.status(200).json(customers); // Aqui está sendo retornado o array customers no JSON, depois de ter sido efetuado a operação acima, que seria de deletar a conta do customer, através do 1 parametro do própio array customers.
});


// Método para retornar/consultar o balance.
app.get("/balance",  verifyIfExistsAccountCPF, (req, res) => {

    const {customer } = req; // Aqui está sendo recuperado os dados os dados do cpf, que está sendo verificado no método function verifyIfExistsAccountCPF.

    const balance = getBalance(customer.statement); // Aqui está sendo recuperado as informções da function getBalance(), e pegando toda a movimentação do credit e debit, através do customer.statement.

    return res.json(balance); // Aqui está sendo retornado apenas as informações que foi pego acima na const balance, e passado para o JSON.
});


app.listen(8080);