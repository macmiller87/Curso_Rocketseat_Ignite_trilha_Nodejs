import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router(); // Aqui está sendo setado o (Router) do express.
const specificationRepository = new SpecificationsRepository(); // Aqui está setada a rota (SpecificationsRepository) do server.ts .

// Aqui está sendo criada a rota de criação da specificação da categoria do carro.
specificationsRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createSpecificationService = new CreateSpecificationService(specificationRepository); // // Aqui está sendo setado e criado um novo objeto (SpecificationsRepository).

    createSpecificationService.execute({ name, description });
    return res.status(201).send();

});

export { specificationsRoutes };