import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";

const router = Router();

// Rota de criação do modelo do carro.
router.use("/categories", categoriesRoutes); // Aqui está sendo setado o categoriesRoutes, e foi adicionado um patch => ("/categories"), para ficar como padrão dessa rota, e não precisar adicionar na rota no arquivo (categories.routes), apenas adiciona o ("/"), para poder usar essa rota.

// Rota de criação da specificação da categoria do carro.
router.use("/specifications", specificationsRoutes); // Aqui está sendo setado o specificationRoutes, e foi adicionado um patch => ("/specifications"), para ficar como padrão dessa rota.

// Rota para a criação do usuário.
router.use("/users", usersRoutes);

// Rota para a autenticação do usuário, (obs: foi passado diretamente a rota dentro do use para não precisar colocar nenhum path na requisição da rota no insomnia)
router.use(authenticateRoutes);

// Rota de criação do carro.
router.use("/cars", carsRoutes);


export { router };