import { Router } from "express"; // Aqui está sendo importando a função (Router), para poder trabalhar com as rotas no server.ts 

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router(); //Aqui está sendo chamada a função (Router). 

// Rota para criar o nome e a categoria do carro.
categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res); // Aqui está sendo retornado o (createCategoryController), com a função handle(req, res) com os parametros.
});


// Rota para listar as informações do carro.
categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);

});


export { categoriesRoutes }; // Aqui está exportando o método acima.

