const express = require('express'); // Aqui estamos requerindo o framework express.
const app = express(); // Aqui estamos setando na const app. 


app.use(express.json()); // Essa função está referenciando a passagen de parametro entre o app.post e a rota no insomnia.




// Aqui estamos criando a rota da aplicação, para o sevidor entender o caminho para renderizar no browser na localhost desejada, com o método get para buscar uma informação no servidor..
app.get("/Courses", (req, res) => {  

    const query = req.query;
    console.log(query);

    // return res.send("Hello World"); Método de envio simples função send();
    // return res.json({message: "Hello world Ignite! - Fundamentos Nodejs "}); // Aqui estamos usando a função json() que irá retornar a msg setada como um json.
    return res.json(["Curso 1", "Curso 2", "Curso 3"]);

});


// Aqui estamos criando a rota da aplicação, com o método post para inseri informação no servidor.

app.post("/Courses", (req, res) => { 

    const body = req.body;
    console.log(body);
    return res.json(["Curso 1", "Curso 2", "Curso 3", "Cruso 4"]);
});


// Aqui estamos criando a rota da aplicação, com o método put para altera informação no servidor.

app.put("/Courses/:id", (req, res) => { 
    
    const { id } = req.params;
    console.log(id);
    return res.json(["Curso 6", "Curso 2", "Curso 3", "Cruso 4"]);

});



// Aqui estamos criando a rota da aplicação, com o método patch para altera informação no servidor.

app.patch("/Courses/:id", (req, res) => { 
    return res.json(["Curso 6", "Curso 7", "Curso 3", "Cruso 4"]);
});


// Aqui estamos criando a rota da aplicação, com o método delete para deletar uma informação no servidor.

app.delete("/Courses/:id", (req, res) => { 
    return res.json(["Curso 6", "Curso 2", "Cruso 4"]);
});



app.listen(8080); // Aqui estamos setando a porta que vai rodar a aplicação localhost.



