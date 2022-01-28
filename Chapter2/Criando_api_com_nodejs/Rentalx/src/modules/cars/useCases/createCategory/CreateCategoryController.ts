import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


class CreateCategoryController {
    constructor(private createCategoryUseCase:  CreateCategoryUseCase) {}

    handle(req: Request, res: Response): Response { // Aqui está sendo usado a função handle() para receber o request e response.
        const { name, description } = req.body;

        this.createCategoryUseCase.execute({name, description}); // Aqui está sendo chamado o método execute() ad classe (createCategoryUseCase) da pasta useCases.

        return res.status(201).send();
    }
}

export { CreateCategoryController };