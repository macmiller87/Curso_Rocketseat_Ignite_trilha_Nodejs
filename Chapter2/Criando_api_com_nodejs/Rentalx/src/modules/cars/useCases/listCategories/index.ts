import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = new CategoriesRepository() // Aqui foi instanciado o categoriesRepository.
const ListCategoriesUseCase = new ListCategoryUseCase(categoriesRepository); // Aqui foi instanciado o ListCategoriesUseCase que depende do (categoriesRepository) que foi passado como parametro.  
const listCategoriesController = new ListCategoriesController(ListCategoriesUseCase); // Aqui foi instanciado o listCategoriesController que depende do (ListCategoriesUseCase) que foi passado como parametro.  


export { listCategoriesController };