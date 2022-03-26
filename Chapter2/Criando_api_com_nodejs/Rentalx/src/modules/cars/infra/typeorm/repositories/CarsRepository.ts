import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name 
    }: ICreateCarDTO): Promise<Car> {

        const car = this.repository.create({
            brand, 
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name 
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;
    }

    // Função que está fazendo as verificações utilizando algumas funçoes do (typeorm).
    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("available = :available", { available: true });

        if(category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }

        if(brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        if(name) {
            carsQuery.andWhere("name = :name", { name });
        }

       const cars = await carsQuery.getMany();
       return cars;
    }
}

export { CarsRepository };
