import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id:  string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository") private rentalRepository: IRentalsRepository,
        @inject("DayjsDateProvider") private dateProvider: IDateProvider,
        @inject("CarsRepository") private carsRepository: ICarsRepository) {}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        // Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

        if(carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        // Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário
        const rentalOpenToUser =  await this.rentalRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There's a reantal in progress for use!");
        }

        // O aluguel deve ter duração mínima de 24 horas.
        const minimumHour = 24;

        // Pega a data atual do sistema.
        const dateNow = this.dateProvider.dateNow();

        // Faz a comparação das datas.
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minimumHour){
            throw new AppError("Invalid return time!"); 
        }

        // Cria o aluguel 
        const rental = await this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        // Define o status do carro 
        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };