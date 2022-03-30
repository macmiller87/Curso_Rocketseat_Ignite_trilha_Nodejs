import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

// Rota de criação do carro, aqui nessa rota está sendo passado as duas funções middlewares para verificar se o usuário está autenticado e se é administrador.
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

// Rota de listagem de carros por (category_id, brand, name)
carsRoutes.get("/available", listAvailableCarsController.handle);

// Rota de criação da specificação de carros por (Id), com autenticação do usúario admin.
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin ,createCarSpecificationController.handle);

export { carsRoutes };