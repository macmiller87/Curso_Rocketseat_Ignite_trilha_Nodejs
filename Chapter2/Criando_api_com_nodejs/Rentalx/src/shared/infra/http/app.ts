import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi  from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import '@shared/container/index'; // Este import faz o tratamento de injeção de dependências (container), nas rotas da aplicação.
import swaggerFile from "../../../swagger.json"; // Para este import precisa colocar no arquivo (tsconfig.json), a opção ("resolveJsonModule": true) desse jeito.

// Import de conexão do BD.
// import "@shared/infra/typeorm/index"

// Import de conexão do BD.
import createConnection from "@shared/infra/typeorm/index";

// Chamada da funçaõ que conecta o BD.
createConnection('database');

const app = express();

app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Aqui está sendo setado os parametros padrão para utilização so swwager.

app.use(router); 

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

export { app };


