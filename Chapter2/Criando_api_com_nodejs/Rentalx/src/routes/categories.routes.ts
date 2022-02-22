import { Router } from "express"; // Aqui está sendo importando a função (Router), para poder trabalhar com as rotas no server.ts 
import multer from "multer"; // Aqui está sendo importado o Multer.

// Pelo mudança feita no aquivo de origem (createCategoryController), aqui no import não é necessário desestruturar no import.
import  createCategoryController  from "../modules/cars/useCases/createCategory";

import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";


const categoriesRoutes = Router(); //Aqui está sendo chamada a função (Router). 

// Aqui foi criado a const (upload), e passado o caminho da pasta (tmp) nessa linha dest: "./tmp".
const upload = multer({
    dest: "./tmp",
});

// Rota para criar o nome e a categoria do carro.
categoriesRoutes.post("/", (req, res) => {
    return createCategoryController().handle(req, res); // Aqui está sendo retornado o (createCategoryController), com a função handle(req, res) com os parametros.
});


// Rota para listar as informações do carro.
categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);

});

// Rota para a criação do arquivo de import da aplicação na pasta (tmp), esse paramatro (upload.single("file")), especifica o nome do arquivo e quantidade de arquivos que vão ser importados pelo insomnia.
categoriesRoutes.post("/import", upload.single("file"),  (req, res) => {
    return importCategoryController.handle(req, res);
});

export { categoriesRoutes }; // Aqui está exportando o método acima.

