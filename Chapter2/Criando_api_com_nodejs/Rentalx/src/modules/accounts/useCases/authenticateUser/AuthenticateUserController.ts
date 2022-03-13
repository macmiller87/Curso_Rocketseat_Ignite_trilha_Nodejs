import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { password, email } = req.body;


        const authenthicateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenthicateUserUseCase.execute({ password, email });

        return res.json(token)
    }
}

export { AuthenticateUserController };