import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string,
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository") private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider") private dateProvider: IDateProvider
    ) {}

    async execute({ id, user_id }: IRequest): Promise<Rental> {
       const rental = await this.rentalsRepository.findById(id);
       const car = await this.carsRepository.findById(rental.car_id);
       const minimum_daily = 1;

       if(!rental) {
           throw new AppError("Rental does not exists!");          
       }

       // Pega a data atual do sistema
       const dateNow = this.dateProvider.dateNow();
 
       // Faz a comparação em dias do aluguel.
       let daily = this.dateProvider.compareInDays(
           rental.start_date,
           this.dateProvider.dateNow()
       );

       // Se acima for menor que (0), atribui automaticamente 1 dia no aluguel.
       if(daily <= 0) {
           daily = minimum_daily;
       }

       // Faz o calculo da quantidade de atraso no aluguel.
       const delay = this.dateProvider.compareInDays(
           dateNow,
           rental.expected_return_date
       );

       let total = 0;

       // Faz o calculo da multa para o carro especifico, baseado no atraso acima.
       if(delay > 0) {
           const calculate_fine = delay * car.fine_amount;
           total = calculate_fine;
       } 

       // Pega o total acima soma com a quantidade de dias do aluguel, e multiplica pelo valor da diaria do carro. 
       total += daily * car.daily_rate;

       // Faz a atulização depois de todas as condiçoes acima.
       rental.end_date = this.dateProvider.dateNow();
       rental.total = total;

       // Cria o aluguel.
       await this.rentalsRepository.create(rental);

       // Atualiza o status do carro.
       await this.carsRepository.updateAvailable(car.id, true);

       return rental;

    }
}

export { DevolutionRentalUseCase };