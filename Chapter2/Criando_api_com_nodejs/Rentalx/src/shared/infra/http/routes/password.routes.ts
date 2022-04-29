import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

// Rota de envio de email para recuperação de senha.
passwordRoutes.post("/forgot", sendPasswordMailController.handle);

// Rota de reset de senha do usuário.
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };