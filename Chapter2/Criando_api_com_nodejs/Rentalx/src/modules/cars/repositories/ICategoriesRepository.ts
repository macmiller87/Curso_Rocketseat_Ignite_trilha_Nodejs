import { Category } from "../entities/category";

// Aqui foi criado a interface e está recebendo e setando o tipo dos atributos.
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

// Aqui foi criado a interface e está recebendo e setando as funções e os atributos.
interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO};