import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificatiosRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

    // Array de specificação;
    specifications: Specification[] = [];

    // Função para criar a specificação;
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.specifications.push(specification);
    }

    // Função para fazer a verificação da specificação pelo (name).
    async findByName(name: string): Promise<Specification> {
        const carSpecifiaction =  this.specifications.find((specification) => specification.name === name);
        return carSpecifiaction;
    }

    // Funçaõ para fazer a verificação da specificação pelos (ids).
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications =  this.specifications.filter((specification) => ids.includes(specification.id));

        return allSpecifications;

    }
}

export { SpecificationsRepositoryInMemory };