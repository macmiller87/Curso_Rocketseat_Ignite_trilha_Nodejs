import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificatiosRepository";

// Criação da classe que implementa a interface (ISpecificationsRepository), no arquivo ISpecificatiosRepository.
class SpecificationsRepository implements ISpecificationsRepository {

    private specifications: Specification[]; // Crisção do array, como método privado.

    constructor() { // Criação do constructor, setando o array com o this ..
        this.specifications = [];
    }

    // Método create passando os parametros e a interface (ICreateSpecificationDTO).
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        this.specifications.push(specification);
    }

    // Aqui foi criado a função (findByName) com a lógica para encontrar o name se ele se repetir.
    findByName(name: string) {
        const specification = this.specifications.find((specification) => specification.name === name);
        return specification;
    }

}

export { SpecificationsRepository };