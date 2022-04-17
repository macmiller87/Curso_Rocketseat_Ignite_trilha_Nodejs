import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUsecase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours =  dayjs().add(1, "day").toDate(); // Essa const pega a data atual do sistema, e (adiciona + 24 horas ou 1 dia).

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayJsDateProvider = new DayjsDateProvider();
        createRentalUsecase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
    });

    // Testa se é capaz de criar um novo aluguel do carro.
    it("Should be able to create a new rental", async () => {

       const rental = await createRentalUsecase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    // Teste que verifica se não é possível criar um novo aluguel para um carro com (usuário) já existente.
    it("Should not be able to create a new rental, if there is another open to the same user", async () => {
        expect(async () => {

            await createRentalUsecase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUsecase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // Teste que verifica se não é possível criar um novo aluguel para um carro com (carro) já existente.
    it("Should not be able to create a new rental, if there is another open to the same car", async () => {
        expect(async () => {

            await createRentalUsecase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            });

            await createRentalUsecase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            });
        }).rejects.toBeInstanceOf(AppError);
    });

     // Teste que verifica se é possível criar aluguel para um carro com o menos de 24 horas de duração do aluguel.
    it("Should not be able to create a new rental, with invalid return time", async () => {
        expect(async () => {
            await createRentalUsecase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});