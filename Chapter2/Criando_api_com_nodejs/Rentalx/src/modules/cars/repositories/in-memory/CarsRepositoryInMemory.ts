import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];

    // Cria o carro.
    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id            
        });

        this.cars.push(car);

        return car;
    }

    // Verifica se o carro existe, pela placa.
    async findByLicensePlate(license_plate: string): Promise<Car> {
        
        const car = this.cars.find((car) => car.license_plate === license_plate);
        return car;
    }

    // Verifica os carros disponíveis, e lista.
    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {

        // Verifica se os carros estão disponíveis
        const carsAvailable = this.cars.filter((car) => {

            // Se a condição acima for atendida, então Verifica se estão disponíveis por (brand, category e name);
            if(car.available === true || ((brand && car.brand === brand) || (category_id && car.category_id === category_id) || (name && car.name === name))) {

                return car;
            }
        });

        return carsAvailable;
    }

    // Verifica se o carro existe pelo ID.
    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);
        return car;
    }

    // Verifica o status do carro
    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);

        this.cars[findIndex].available = available;
    }

}

export { CarsRepositoryInMemory };