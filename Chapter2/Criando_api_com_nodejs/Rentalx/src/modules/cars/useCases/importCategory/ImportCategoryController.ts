import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

    // Aqui foi criado o construtor, e colado como private.
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    // Aqui foi criado a função (handle) com os parametros de req e res.
    handle(req:  Request, res:  Response): Response {

        const { file } = req;
        this.importCategoryUseCase.execute(file); // Aqui foi setado como (this), por causa do construtor está privado, e chamado o paramatro (importCategoryUseCase), criando a função (execute(file)), para execuatr o arquivo file.
        return res.send();
    }
}

export { ImportCategoryController };