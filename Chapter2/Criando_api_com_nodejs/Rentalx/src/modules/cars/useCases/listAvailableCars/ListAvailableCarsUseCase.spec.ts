import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    // Teste que cria e verifica os carros disponíveis.
    it("Should be able to list all available cars", async () => {

     const car = await carsRepositoryInMemory.create({
        "name": "Car 1",
        "description": "Car description",
        "daily_rate": 110.00,
        "license_plate": "DEF-1234",
        "fine_amount": 40,
        "brand": "Car_brand",
        "category_id": "category_id"
       });

       const cars = await listAvailableCarsUseCase.execute({});

       expect(cars).toEqual([car]);
    });

    // Teste que verifica os carros disponíveis pela (brand).
    it("Should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car 2",
            "description": "Car description",
            "daily_rate": 110.00,
            "license_plate": "DEF-1234",
            "fine_amount": 40,
            "brand": "Car_brand_test",
            "category_id": "category_id"
        });
    
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });
    
        expect(cars).toEqual([car]);
    });

    // Teste que verifica os carros disponíveis pela (name).
    it("Should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car 3",
            "description": "Car description",
            "daily_rate": 110.00,
            "license_plate": "DEF-123456",
            "fine_amount": 40,
            "brand": "Car_brand",
            "category_id": "category_id"
        });
    
        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 3",
        });
    
        expect(cars).toEqual([car]);
    });

    // Teste que verifica os carros disponíveis pelo (category_id).
    it("Should be able to list all available cars by category Id", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "Car 4",
            "description": "Car description",
            "daily_rate": 110.00,
            "license_plate": "DEF-123456",
            "fine_amount": 40,
            "brand": "Car_brand",
            "category_id": "12345678"
        });
    
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345678",
        });
    
        expect(cars).toEqual([car]);
    });

});