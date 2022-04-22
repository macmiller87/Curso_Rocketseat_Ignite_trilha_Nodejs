import { inject, injectable } from "tsyringe"; // Aqui está sendo importada a função (inject e injectable) da lib (tsyringe).
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Aqui foi criado a interface e está recebendo e setando os tipos dos atributos.
interface IRequest {
    name: string;
    description: string;
}

// Aqui está sendo usado a função (injectable), que permite que a classe (CreateCategoryUseCase), possa receber a injeção de dependência, nesse caso está sendo injetado a classe (CategoriesRepository).
@injectable()
class  CreateCategoryUseCase {
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {} // Aqui está sendo usado a função (@inject), que tem a função de injetar a dependência, ou seja a (ICategoriesRepository), pela lib (tsyringe), também foi criado o (constructor) e passado como (private), chamando (CategoriesRepository)

    // Aqui foi criado a função execute passando os parametros e setando a interface (IRequest), e dizendo que essa função e (void).
    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlredyExists = await this.categoriesRepository.findByName(name); // Aqui está sendo setado a classe (categoriesRepository), com a função (findByName(name)), que está tratando a validação no arquivo categoriesRepository.ts

        if(categoryAlredyExists) {
            throw new AppError("Category Already exists!");
        }

        this.categoriesRepository.create({ name, description }); // Aqui está sendo setado a classe (CategoriesRepository) e passando a função create({name, description}) com seus atributos name e description.
    }
}


export { CreateCategoryUseCase }; // Aqui está sendo exportado a classe (CreateCategoryService).