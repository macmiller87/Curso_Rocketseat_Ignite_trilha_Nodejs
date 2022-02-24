import { Specification } from "../entities/Specification";

// Interface DTO com os parametros.
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

// Interface com a passagem dos parametros, método e função create() .
interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }; 