import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {


    // Aqui foi criado a função (handle) com os parametros de req e res.
     async handle(req:  Request, res:  Response): Promise<Response> {

        const { file } = req;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        await importCategoryUseCase.execute(file); // Aqui foi setado como (this), por causa do construtor está privado, e chamado o paramatro (importCategoryUseCase), criando a função (execute(file)), para execuatr o arquivo file.
        return res.send();
    }
}

export { ImportCategoryController };