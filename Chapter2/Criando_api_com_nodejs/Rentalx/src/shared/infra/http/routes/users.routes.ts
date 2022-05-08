import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig); // Essa const está recebendo, o import da função de (uploadConfig).

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserControlle = new ProfileUserController();

// Rota de criação do usuário
usersRoutes.post("/", createUserController.handle);

// Rota de criação e atualização do avatar do usuário
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

// Rota que exibe o perfil do usuário.
usersRoutes.get("/profile", ensureAuthenticated, profileUserControlle.handle);

export { usersRoutes };