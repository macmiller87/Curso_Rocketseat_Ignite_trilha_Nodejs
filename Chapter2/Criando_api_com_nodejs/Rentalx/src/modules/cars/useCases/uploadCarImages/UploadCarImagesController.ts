import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {

    async handle(req: Request, res: Response): Promise<Response> {

         // Aqui foi subscrito o array de (images), com a interface (IFiles) para poder conseguir acessar o nome das imagens no array, pelo const abaixo (images_name).
        const images = req.files as IFiles[];
        const { id } = req.params;

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        const images_name = images.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_name,
        });

        return res.status(201).send();
    }
}


export { UploadCarImagesController };