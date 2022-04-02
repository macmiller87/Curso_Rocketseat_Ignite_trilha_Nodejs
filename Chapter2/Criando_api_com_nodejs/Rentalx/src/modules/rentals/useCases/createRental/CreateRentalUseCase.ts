import { AppError } from "@shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id:  string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(private rentalRepository: IRentalsRepository) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if(carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser =  await this.rentalRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There's a reantal in progress for use!");
        }

        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }
}

export { CreateRentalUseCase };