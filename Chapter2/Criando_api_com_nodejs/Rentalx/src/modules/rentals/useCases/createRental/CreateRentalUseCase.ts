import { AppError } from "@shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Esse import é do (pluggin do utc), para conseguir manipular a date no formato utc.

// Aqui está sendo setado a lib(dayjs) e a subib(utc).
dayjs.extend(utc);

interface IRequest {
    user_id:  string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {

    constructor(private rentalRepository: IRentalsRepository) {}

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

        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format(); // Essa const pega a data que está sendo passada na aplicação, e formata para o padrão (utc).

        const dateNow = dayjs().utc().local().format(); // Essa const pega a data atual do sistema, e formata para o padrão (utc).

        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours"); // Essa const pega as duas datas acima, e faz a comparação enter ela em (horas), que é o parametro que está sendo pedido no momento. (mas existem mais opçoes).

        if(compare < minimumHour){
            throw new AppError("Invalid return time!"); 
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