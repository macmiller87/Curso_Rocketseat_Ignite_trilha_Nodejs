import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

// Rota de criação do modelo do carro.
router.use("/categories", categoriesRoutes);

// Rota de criação da specificação da categoria do carro.
router.use("/specifications", specificationsRoutes);

// Rota para a criação do usuário.
router.use("/users", usersRoutes);

// Rota para a autenticação do usuário, (obs: foi passado diretamente a rota dentro do use para não precisar colocar nenhum path na requisição da rota no insomnia)
router.use(authenticateRoutes);

// Rota de criação do carro.
router.use("/cars", carsRoutes);

// Rota de criação do aluguel.
router.use("/rentals", rentalRoutes);

// Rota de envio de email para recuperação de senha.
router.use("/password", passwordRoutes);

export { router };