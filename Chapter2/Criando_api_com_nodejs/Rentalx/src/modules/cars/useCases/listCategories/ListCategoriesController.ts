import { Request, Response } from "express";
import { ListCategoryUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoryUseCase) {}

    handle(req: Request, res: Response): Response {

        const all = this.listCategoriesUseCase.execute(); // Aqui está sendo usado a classe (categoriesRepository) e a função list(), para poder fazer a listagem dos items.

        return res.json(all);
    }
}

export { ListCategoriesController };