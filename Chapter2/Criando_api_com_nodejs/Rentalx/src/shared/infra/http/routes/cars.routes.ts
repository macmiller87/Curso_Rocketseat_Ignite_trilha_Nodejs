import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import uploadConfig from "@config/upload";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars")); // Essa const está recebendo, o import da função de (uploadConfig) e a localização da pasta e arquivo (TMP/cars).

// Rota de criação do carro, aqui nessa rota está sendo passado as duas funções middlewares para verificar se o usuário está autenticado e se é administrador.
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

// Rota de listagem de carros por (category_id, brand, name)
carsRoutes.get("/available", listAvailableCarsController.handle);

// Rota de criação da specificação de carros por (Id), com autenticação do usúario admin.
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

// Rota de cadastro de imagens do carro, com autenticação do usúario admin, ques está recebendo a const (upload) + a função array com o nome da const (images) do arquivo (UploadCarImagesController).
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle);

export { carsRoutes };