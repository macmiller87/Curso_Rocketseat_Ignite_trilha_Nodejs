import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi  from "swagger-ui-express"; // Aqui está sendo importado o Swagger.

import "./database/index"; // Aqui está sendo importado o arquivo index, que faz a conexão com o BD.

import "@shared/container/index" // Aqui está sendo importado o arquivo index.ts, que está referenciando, toda a classe de criação e suas dependências.

import { AppError } from "@errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json"; // Para este import precisa colocar no arquivo (tsconfig.json), a opção ("resolveJsonModule": true) desse jeito.


const app = express();

app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Aqui está sendo setado os parametros padrão para utilização so swwager.

app.use(router); // Aqui foi setado o (router), que está no arquivo index.ts de rotas da aplicação. 

// Aqui foi criado essa rota para a aplicação retornar o tipo de erro padronizado, (obs: sempre trazer como 1 parametro o err, o (next) está usando a função (NextFunction), que já é padrão da propria função next, que é um middleware).  
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

app.listen(8080, () => console.log('Server is running!'));


