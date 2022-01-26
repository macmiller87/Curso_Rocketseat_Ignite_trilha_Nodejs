import { Category } from "../model/category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

// Aqui foi criado a classe e sendo implementada pela (ICategoriesRepository) e sendo passado as funções.
class PostgresCategoriesRepositories implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name);
        return null;
    }
    list(): Category[] {
        return null;
    }
    create({ name, description }:  ICreateCategoryDTO): void {
        console.log(name, description);
    }
}

export { PostgresCategoriesRepositories };