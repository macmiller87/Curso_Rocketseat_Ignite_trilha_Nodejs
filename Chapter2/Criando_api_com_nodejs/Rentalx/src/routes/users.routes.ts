import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

// Rota de criação do usuário
usersRoutes.post("/", createUserController.handle);

// Rota de criação e atualização do avatar do usuário
usersRoutes.patch("/avatar", updateUserAvatarController.handle);

export { usersRoutes };