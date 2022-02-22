import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// Aqui foi colocado toda as rotas da  criação da categoria dentro da função (export default), para não ficar soltas, e poder ser chamada pelo arquivo (categories.routes), aonde estão as rotas HTTP.
export default ():  CreateCategoryController => {

    const categoriesRepository = new CategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;

};
