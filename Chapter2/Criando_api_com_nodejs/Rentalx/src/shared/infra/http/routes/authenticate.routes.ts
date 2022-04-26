import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes =  Router();

const authenticateUserController =  new AuthenticateUserController();
const refreshTokenController =  new RefreshTokenController();

// Rota de autenticação do usuário.
authenticateRoutes.post("/sessions", authenticateUserController.handle);

// Rota de refreshToken.
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };