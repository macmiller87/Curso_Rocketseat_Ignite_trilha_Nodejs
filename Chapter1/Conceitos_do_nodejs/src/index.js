const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];


// Método para verificação, se existe o usúario criado, e se essa informação for === true, todos os métodos abaixo vão usar essa função, que vai ser passada através da função next() .
function checksExistsUsername(req, res, next) {

    const { username } = req.headers; // Aqui está sendo usada a função (.headers), ela busca o parametro pelo cabeçalho.
    const user = users.find((user) => user.username === username); // Aqui está sendo usada a função find() para fazer a comparação do (username).

    if(!user) {

        return res.status(404).json({error: "User not found !"});
    }

    req.user = user;

    return next();

}


// Método para a criação de um usúario, ou novo usúario, e não deixa criar um usúario já existente.
app.post("/users", (req, res) => {

    const { name, username } = req.body; // Método padrão para inserir dados (.body) .

    const userAlredyExistis =  users.find(user => user.username === username); // Aqui está sendo usado a função some() que vai fazer a verificação do dado dentro do array (users).

    if(userAlredyExistis) {

        return res.status(400).json({ error: "Username already exists !"});
    }

    users.push({

        id: uuidv4(),
        name,
        username,
        todos: []

    });

    return res.status(201).json(users);
    
});


// Método para listar todas as tarefas do/dos usúarios, e não ser possível listar as tarefas de um usúario que não existe.
app.get("/todos", checksExistsUsername, (req, res) => {

    const { user } = req; // Aqui está sendo desetruturado o (user) e colocado nessa const, para passar como parametro para a função middleware checksExistsUsername , nessa linha --> req.user = user;

    return res.json(user.todos); // Aqui vai retornar as informações no json.

});


// Método para criar uma nova lista de tarefas/novoTodo.
app.post("/todos", checksExistsUsername, (req, res) => {
    
    const { user } = req;
    const { title, deadline} = req.body;  
    
    const novoTodo = {

        id: uuidv4(),
        title,
        done: false,
        deadline: new Date(deadline), // Aqui vai ser pego a data automática, do deadline.
        created_at: new Date(), // Aqui vai ser pego a data para referenciar a criação do TODO.

    }

    user.todos.push(novoTodo); // Aqui está sendo inserido dentro do array users, e depois dentro do objeto (todos), que também é um array que está dentro do array (users), as informações da const novoTodo.

    return res.status(201).json(novoTodo);

});
  

// Método para atualizar os dados do (novoTodo), pela comparação do ID, permite atualizar os dados do (title) e (deadline).
app.put("/todos/:id", checksExistsUsername, (req, res) => {
    
    const { user } = req;
    const { title, deadline } = req.body; 
    const { id } = req.params;

    const todo = user.todos.find((todos) => todos.id === id); // Aqui está sendo usada a função find() para compara o ID.

    if(!todo) {

        return res.status(404).json({error: "the user id is not the same !"});

    }

    todo.title = title;
    todo.deadline = new Date(deadline);    

    return res.json(todo);

});


// Método para atualizar os dados do (novoTodo), pela comparação do Id, permite atualizar os dados da propriedade (done) para (true) no (novoTodo) que possuir o ID igual ao parametro da requisição. 
app.patch("/todos/:id/done", checksExistsUsername, (req, res) => {
    
    const { user } = req; 
    const { id } = req.params;

    const todo = user.todos.find((todos) => todos.id === id); 

    if(!todo) {

        return res.status(404).json({error: "the user id is not the same !"});

    }

    todo.done = true;

    return res.json(todo);

});


// Método para deletar o (novoTodo), que possuir o mesmo ID.
app.delete("/todos/:id", checksExistsUsername, (req, res) => {
    
    const { user } = req;
    const { id } = req.params;

    const todoIndex = user.todos.findIndex((todos) => todos.id === id); // Aqui está sendo usado a função findIndex(), que retorna a posição no array que o ID existe.

    if(todoIndex === -1) {

        return res.status(404).json({error: "Todo not found !"});

    }

        user.todos.splice(todoIndex, 1); // Aqui está sendo usado a função splice() que remove um valor dentro de um array, nesse caso o objeto (user), que tem o array (todos) onde guarda as informações da tarefa do usúario.

    return res.status(204).json(); // Aqui estamos apenas referenciando o status(204), que se refere a sucesso nessa tarefa

});


app.listen(8080);