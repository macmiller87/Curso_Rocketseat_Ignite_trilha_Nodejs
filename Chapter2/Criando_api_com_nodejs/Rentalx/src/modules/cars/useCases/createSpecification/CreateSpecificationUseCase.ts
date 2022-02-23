import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificatiosRepository";

interface IRquest {
    name:  string;
    description: string;
}

// Aqui foi criado a classe para tratar as specificações, acaso ela se repita.
@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRquest): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new Error("Specification already exists !");
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };