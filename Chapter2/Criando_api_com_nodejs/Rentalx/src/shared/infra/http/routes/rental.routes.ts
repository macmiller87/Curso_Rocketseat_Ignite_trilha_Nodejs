import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalControler = new CreateRentalController();

// Rota de criação do aluguel, com usuário autenticado.
rentalRoutes.post("/", ensureAuthenticated, createRentalControler.handle);

export { rentalRoutes };

