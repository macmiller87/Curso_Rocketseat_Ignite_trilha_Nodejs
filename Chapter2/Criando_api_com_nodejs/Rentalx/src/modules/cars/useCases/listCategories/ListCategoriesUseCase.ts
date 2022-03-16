import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/cars/infra/typeorm/entities/category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

@injectable()
class ListCategoryUseCase {
    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {} // Aqui foi criado o (constructor) e passado como (private), chamando (CategoriesRepository)

    // Aqui foi criado a função execute passando os parametros e setando a interface (IRequest), e dizendo que essa função e (void).
    async execute(): Promise<Category[]> {

        const categories = await this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };