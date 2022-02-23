import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {

   async handle(req: Request, res: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoryUseCase);

        const all = await listCategoriesUseCase.execute(); // Aqui está sendo usado a classe (categoriesRepository) e a função list(), para poder fazer a listagem dos items.

        return res.json(all);
    }
}

export { ListCategoriesController };