import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {

    rentals: Rental[] = [];

    // Verifica o aluguel do carro, pelo (car_id).
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
        return rental;
    }

    // Verifica o aluguel do carro pelo (user_id).
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const user = this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
        return user;
    }

    // Cria os metodos abaixo.
    async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date()
        });

        this.rentals.push(rental);
        return rental;
    }

    // Verifica o aluguel pelo (ID) do aluguel.
    async findById(id: string): Promise<Rental> {
       const user = this.rentals.find((rental) => rental.id === id);
       return user;
    }

    // Verifica o usuário pelo (ID) do usuário
    async findByUser(user_id: string): Promise<Rental[]> {
        const user = this.rentals.filter((rental) => rental.user_id === user_id);
        return user;
    }
}

export { RentalsRepositoryInMemory };