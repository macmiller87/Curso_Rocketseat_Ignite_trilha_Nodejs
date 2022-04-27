import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendPasswordMailController = new SendForgotPasswordMailController();

// Rota de envio de email para recuperação de senha.
passwordRoutes.post("/forgot", sendPasswordMailController.handle);

export { passwordRoutes };