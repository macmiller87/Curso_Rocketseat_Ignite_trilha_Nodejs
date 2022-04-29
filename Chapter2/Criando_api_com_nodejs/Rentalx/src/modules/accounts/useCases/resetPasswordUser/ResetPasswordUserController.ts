import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { token } = req.query;
        const { password } = req.body;

        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

        // Aqui foi necessário forçar o (token) a vim como (String).
        await resetPasswordUserUseCase.execute({ token: String(token), password  });

        return res.send();
    }
}

export { ResetPasswordUserController };