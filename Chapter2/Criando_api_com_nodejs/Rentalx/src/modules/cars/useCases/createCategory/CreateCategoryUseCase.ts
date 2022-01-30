import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"; // Aqui está sendo importando a classe(CategoriesRepository).
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

// Aqui foi criado a interface e está recebendo e setando os tipos dos atributos.
interface IRequest {
    name: string;
    description: string;
}


class  CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {} // Aqui foi criado o (constructor) e passado como (private), chamando (CategoriesRepository)

    // Aqui foi criado a função execute passando os parametros e setando a interface (IRequest), e dizendo que essa função e (void).
    execute({ name, description }: IRequest): void {
        const categoryAlredyExists = this.categoriesRepository.findByName(name); // Aqui está sendo setado a classe (categoriesRepository), com a função (findByName(name)), que está tratando a validação no arquivo categoriesRepository.ts

        if(categoryAlredyExists) {
            throw new Error("Category Alredy exists !");
        }

        this.categoriesRepository.create({ name, description }); // Aqui está sendo setado a classe (CategoriesRepository) e passando a função create({name, description}) com seus atributos name e description.
    }
}


export { CreateCategoryUseCase }; // Aqui está sendo exportado a classe (CreateCategoryService).