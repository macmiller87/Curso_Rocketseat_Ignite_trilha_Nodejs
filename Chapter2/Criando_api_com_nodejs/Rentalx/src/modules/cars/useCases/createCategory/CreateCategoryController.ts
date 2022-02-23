import { Request, Response } from "express";
import { container } from "tsyringe"; // Aqui está sendo usado a função (container), e passado a lib (tsyringe)
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


class CreateCategoryController {

    async handle(req: Request, res: Response): Promise<Response> { // Aqui está sendo usado a função handle() para receber o request e response.
        const { name, description } = req.body;

        // Aqui está sendo usado a função (container.resolve), que vai injetar a dependência (CreateCategoryUseCase), nessa classe (CreateCategoryController).  
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({name, description}); // Aqui está sendo chamado o método execute() ad classe (createCategoryUseCase) da pasta useCases.

        return res.status(201).send();
    }
}

export { CreateCategoryController };