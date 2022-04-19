import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalControler = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

// Rota de criação do aluguel, com usuário autenticado.
rentalRoutes.post("/", ensureAuthenticated, createRentalControler.handle);

// Rota que faz a devolução do carro.
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

export { rentalRoutes };

