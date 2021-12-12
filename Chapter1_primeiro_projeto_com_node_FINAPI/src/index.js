const express = require('express');
const { v4: uuidv4 } = require("uuid"); // Aqui está sendo requirido o pacote uuid para gerar id único, o (v4) gera id randomicos. 

const app = express();

app.use(express.json()); // Aqui está sendo setado a função use(express.json() , para poder a aplicaçõa receber os dados via JSON.

const customers = []; // Array de dados dos clientes

/*
cpf - string
name string
id - uuid
statement: []
*/


// Método para criação de conta, e metodo para não poder ser possível cadastrar uma conta com CPF já existente.
app.post("/account", (req, res) =>{

    const { cpf, name } = req.body; // Método padrão para inserir dados (.body) .

    // Aqui está sendo usado a função some() que vai fazer a verificação do dado dentro do  array customers
    const customerAlredyExistis = customers.some( 
        (customer) => customer.cpf === cpf
    );

    // Aqui se a função acima retornar true; ou dado já exitir, então vai ser retornado um JSON com a msg setada.
    if(customerAlredyExistis) {
        return res.status(400).json({error: "Customers already exists!"}); 
    }


    customers.push({ // Aqu vai ser pego cada dado e colocado dentro do array costumers.

        cpf,
        name,
        id: uuidv4(), // aqui está sendo chamado a função (uuidv4), que vai gerar os id's.
        statement: [],

    });

    return res.status(201).send(); // Aqui está sendo setado o parametro res.status(201).send() , para que não vai retornar nehuma informação, ele só vai mostrar que foi criado o dado pelo status(201) o status(201) e para quando o dado foi criado com sucesso.

});


// app.get("/statement/:cpf" // Seria esse formato se fosse usar a funçã (params).

app.get("/statement", (req, res) => { // Aqui foi passado o tipo de parametro (Route Params) através do :cpf, que vai ser o identificador.

    const { cpf } = req.headers; //  Aqui está sendo usado a função (headers) que não é necessario passar o id, que no caso seria o cpf, ele vai buscar o dado pelo cabeçario/header.

    // const { cpf } = req.params; // Aqui está sendo usado a função (params) obrigatorio pela definição que foi passada acima, para poder pegar o dado so cpf.
    // app.get("/statement/:cpf" // Seria esse formato se fosse usar a funçã (params).

    const customer = customers.find(customer => customer.cpf === cpf); // aqui esta sendo usado a função (find) para procurar dentro do array customers, se tem o cpf igual.


    // Aqui se não tiver encontrado o dado acima, ele vai cair nesse if, e setar esse msg de erro pelo JSON.
    if(!customer) {

        return res.status(400).json({error: "Customer not found"}); 
    }

    return res.json(customer.statement); // Aqui vai retornar o statement em JSON que é o dado do array customers.

});


console.log("Servidor rodando ..");

app.listen(8080);