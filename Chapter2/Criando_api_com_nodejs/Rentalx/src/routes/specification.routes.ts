import { Router } from "express";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router(); // Aqui está sendo setado o (Router) do express..

// Aqui está sendo criada a rota de criação da specificação da categoria do carro.
specificationsRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

export { specificationsRoutes };