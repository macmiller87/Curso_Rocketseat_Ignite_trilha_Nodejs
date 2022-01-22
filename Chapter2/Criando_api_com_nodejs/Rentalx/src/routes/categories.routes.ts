import { Router } from "express"; // Aqui está sendo importando a função (Router), para poder trabalhar com as rotas no server.ts

const categoriesRoutes = Router(); //Aqui está sendo chamada a função (Router).

const categories = [];


// Rota para criar o nome e a categoria do carro.
categoriesRoutes.post("/categories", (req,res) => {
    const { name, description } = req.body;

    categories.push({
        name,
        description
    })

    return res.status(201).send();
});

export { categoriesRoutes }; // Aqui está eportando o método acima

