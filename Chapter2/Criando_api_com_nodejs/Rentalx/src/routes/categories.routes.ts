import { Router } from "express"; // Aqui está sendo importando a função (Router), para poder trabalhar com as rotas no server.ts 

import { CategoriesRepository } from "../repositories/categoriesRepository"; // Aqui está sendo importando a classe(CategoriesRepository).

const categoriesRoutes = Router(); //Aqui está sendo chamada a função (Router). 
const categoriesRepository = new CategoriesRepository(); // Aqui está chamada a classe (CategoriesRepository);

// Rota para criar o nome e a categoria do carro.
categoriesRoutes.post("/", (req,res) => {
    const { name, description } = req.body;

    const categoryAlredyExists = categoriesRepository.findByName(name); // Aqui está sendo setado a classe (categoriesRepository), com a função (findByName(name)), que está tratando a validação no arquivo categoriesRepository.ts

    if(categoryAlredyExists) {
        return res.status(400).json({error: "Category Alredy exists !"});
    }

    categoriesRepository.create({ name, description }); //  Aqui está sendo setado a classe (CategoriesRepository) e passando a função create({name, description}) com seus atributos name e description.

    return res.status(201).send();
});


// Rota para listar as informações do carro.
categoriesRoutes.get("/", (req, res) => {

    const all = categoriesRepository.list(); // Aqui está sendo usado a classe (categoriesRepository) e a função list(), para poder fazer a listagem dos items.

    return res.json(all);
});


export { categoriesRoutes }; // Aqui está exportando o método acima.

