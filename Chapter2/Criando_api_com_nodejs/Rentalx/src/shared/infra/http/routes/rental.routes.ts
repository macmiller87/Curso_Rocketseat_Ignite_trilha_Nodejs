import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalControler = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

// Rota de criação do aluguel, com usuário autenticado.
rentalRoutes.post("/", ensureAuthenticated, createRentalControler.handle);

// Rota que faz a devolução do carro, com usuário autenticado.
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

// Rota de listagem dos alugueis, com usuário autenticado.
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };

