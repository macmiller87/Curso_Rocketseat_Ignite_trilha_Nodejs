import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar")); // Essa const está recebendo, o import da função de (uploadConfig) e a localização da pasta e arquivo (TMP/avatar).

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

// Rota de criação do usuário
usersRoutes.post("/", createUserController.handle);

// Rota de criação e atualização do avatar do usuário
usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };