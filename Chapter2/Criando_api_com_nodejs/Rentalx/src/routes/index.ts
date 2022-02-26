import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

// Rota de criação do modelo do carro.
router.use("/categories", categoriesRoutes); // Aqui está sendo setado o categoriesRoutes, e foi adicionado um patch => ("/categories"), para ficar como padrão dessa rota, e não precisar adicionar na rota no arquivo (categories.routes), apenas adiciona o ("/"), para poder usar essa rota.

// Rota de criação da specificação da categoria do carro.
router.use("/specifications", specificationsRoutes); // Aqui está sendo setado o specificationRoutes, e foi adicionado um patch => ("/specifications"), para ficar como padrão dessa rota.

router.use("/users", usersRoutes);


export { router };