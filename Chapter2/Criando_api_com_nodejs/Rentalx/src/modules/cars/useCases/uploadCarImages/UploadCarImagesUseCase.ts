import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStoregeProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {

    constructor(
        @inject("CarsImagesRepository") private carsImagesRepository: ICarsImagesRepository,
        @inject("StorageProvider") private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {

        images_name.map(async (image) => {

            // Salva upload de cars local.
            await this.carsImagesRepository.create(car_id, image);

            // Salva upload de cars via (s3 AWS).
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImagesUseCase };