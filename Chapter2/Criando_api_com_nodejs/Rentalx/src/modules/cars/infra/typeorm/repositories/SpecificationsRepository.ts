import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificatiosRepository";

// Criação da classe que implementa a interface (ISpecificationsRepository), no arquivo ISpecificatiosRepository.
class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    constructor() { 
        this.repository = getRepository(Specification);
    }

    // Método create passando os parametros e a interface (ICreateSpecificationDTO).
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);

        return specification;
    }

    // Aqui foi criado a função (findByName) com a lógica para encontrar o name se ele se repetir.
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    // Aqui foi criado a função (findById) para encontar a specificação pelo ID.
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specification = await this.repository.findByIds(ids);
        return specification;
    }
}

export { SpecificationsRepository };