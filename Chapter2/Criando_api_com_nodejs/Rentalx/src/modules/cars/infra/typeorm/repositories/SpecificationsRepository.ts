import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificatiosRepository";

// Criação da classe que implementa a interface (ISpecificationsRepository), no arquivo ISpecificatiosRepository.
class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    constructor() { // Criação do constructor, setando o array com o this ..
        this.repository = getRepository(Specification);
    }

    // Método create passando os parametros e a interface (ICreateSpecificationDTO).
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }

    // Aqui foi criado a função (findByName) com a lógica para encontrar o name se ele se repetir.
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ name });
        return specification;
    }

}

export { SpecificationsRepository };