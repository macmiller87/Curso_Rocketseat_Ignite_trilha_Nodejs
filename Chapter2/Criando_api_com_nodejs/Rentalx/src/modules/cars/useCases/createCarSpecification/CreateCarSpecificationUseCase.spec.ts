import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });


    // Teste que verifica o cadastro de uma specificação para um carro que não existe.
    it("Should not be able to add a new specification a not-existent car", async () => {

        expect(async () => {
            const car_id =  "1234";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });


    // Teste que verifica o cadastro de uma specificação para um carro.
    it("Should be able to add a new specification for the car", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Name Car", 
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category" 
        });

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    });
});