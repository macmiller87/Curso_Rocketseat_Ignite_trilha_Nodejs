import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router(); // Aqui está sendo setado o (Router) do express..

// Aqui foi criado essa const, para referenciar a classe (createSpecificationController) e suas dependências, para poder ser usada na rota, como se fosse uma função middleware.
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);

// Aqui está sendo criada a rota de criação da specificação da categoria do carro, passando a classe (createSpecificationController) e suas dependências, com a função handle.
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };