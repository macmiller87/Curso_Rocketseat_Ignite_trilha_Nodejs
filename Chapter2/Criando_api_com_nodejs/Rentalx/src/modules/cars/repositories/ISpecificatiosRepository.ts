import { Specification } from "../model/Specification";

// Interface DTO com os parametros.
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

// Interface com a passagem dos parametros, método e função create() .
interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification
}

export { ISpecificationsRepository, ICreateSpecificationDTO }; 