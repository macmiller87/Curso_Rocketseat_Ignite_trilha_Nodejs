import { Router } from "express"; // Aqui está sendo importando a função (Router), para poder trabalhar com as rotas no server.ts 
import multer from "multer"; // Aqui está sendo importado o Multer.


import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";


const categoriesRoutes = Router(); //Aqui está sendo chamada a função (Router). 

// Aqui foi criado a const (upload), e passado o caminho da pasta (tmp) nessa linha dest: "./tmp".
const upload = multer({
    dest: "./tmp",
});

// Aqui foi criado essa const, para referenciar a classe (CreateCategoryController) e suas dependências, para poder ser usada nas rotas, como se fosse uma função middleware.
const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

// Rota para criar o nome e a categoria do carro, passando a classe (CreateCategoryController) e suas dependências, com a função handle.
categoriesRoutes.post("/", createCategoryController.handle);

// Rota para listar as informações do carro, passando a classe (listCategoriesController) e suas dependências, com a função handle.
categoriesRoutes.get("/", listCategoriesController.handle);

// Rota para a criação do arquivo de import da aplicação na pasta (tmp), esse paramatro (upload.single("file")), especifica o nome do arquivo e quantidade de arquivos que vão ser importados pelo insomnia, e passando a classe (importCategoryController) e suas dependências, com a função handle.
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes }; // Aqui está exportando o método acima.

