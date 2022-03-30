import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {

    constructor(
        @inject("CarsRepository") private carsRepository: ICarsRepository, 
        @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {

        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists) {
            throw new AppError("Car does not exists!");   
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);

        return carExists;

    }
}

export { CreateCarSpecificationUseCase };