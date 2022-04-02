import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUsecase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUsecase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    // Testa se é capaz de criar um novo aluguel do carro.
    it("Should be able to create a new rental", async () => {

       const rental = await createRentalUsecase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date()
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
                expected_return_date: new Date()
            });

            await createRentalUsecase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // Teste que verifica se não é possível criar um novo aluguel para um carro com (carro) já existente.
    it("Should not be able to create a new rental, if there is another open to the same car", async () => {
        expect(async () => {

            await createRentalUsecase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: new Date()
            });

            await createRentalUsecase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: new Date()
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});