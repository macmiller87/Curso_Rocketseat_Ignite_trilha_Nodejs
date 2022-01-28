import { Category } from '../../model/category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

class ListCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {} // Aqui foi criado o (constructor) e passado como (private), chamando (CategoriesRepository)

    // Aqui foi criado a função execute passando os parametros e setando a interface (IRequest), e dizendo que essa função e (void).
    execute(): Category[] {

        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoryUseCase };