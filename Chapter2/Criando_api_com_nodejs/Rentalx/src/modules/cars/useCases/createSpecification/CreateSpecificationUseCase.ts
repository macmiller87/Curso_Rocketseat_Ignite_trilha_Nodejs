import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";

interface IRquest {
    name:  string;
    description: string;
}

// Aqui foi criado a classe para tratar as specificações, acaso ela se repita.
@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

    async execute({ name, description }: IRquest): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists) {
            throw new AppError("Specification already exists !");
        }

        await this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };