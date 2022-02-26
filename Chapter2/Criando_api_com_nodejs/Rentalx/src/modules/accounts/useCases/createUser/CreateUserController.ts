import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response>  {
        const { name, email, password, driver_license } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ 
            name,  
            email, 
            password, 
            driver_license 
        });

        return res.status(201).send();
    }
}

export { CreateUserController };