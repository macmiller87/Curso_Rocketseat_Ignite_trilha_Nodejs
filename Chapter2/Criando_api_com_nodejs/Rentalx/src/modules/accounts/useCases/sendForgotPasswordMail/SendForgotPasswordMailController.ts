import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {

   async handle(req: Request, res: Response): Promise<Response> {
       
        const { email } = req.body;
        const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

        await sendForgotPasswordMailUseCase.execute(email);

        return res.send();

   }
}

export { SendForgotPasswordMailController };