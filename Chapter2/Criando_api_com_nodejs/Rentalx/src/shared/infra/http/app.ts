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
import upload from "@config/upload";
import cors from "cors";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

// Chamada da funçaõ que conecta o BD.
createConnection('database');

const app = express();

app.use(rateLimiter);

// Cria o cliente do (Sentry),  passando os parâmetros de acesso.
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
  
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler()); // Aqui está sendo setado o (requestHandler), que manipula as requisições.
app.use(Sentry.Handlers.tracingHandler()); // Aqui está sendo setado o (tracingHandler), que rastreia as requisições.

app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Aqui está sendo setado os parametros padrão para utilização so swwager.

// Rota  para expor(visualizar) as imagens de (avatar) quando são salvas (local);
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

// Rota  para expor(visualizar) as imagens de (cars) quando são salvas (local);
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors()); // Serve para disponibilizar a (API), para um consumo de um frontend, e também é possível passar alguns parâmetros para disponibilizar a (API) para um domínio específico, ou aberto para qualquer um com (ip), ou pelo (localhost), que é do jeito que está.
app.use(router); 

app.use(Sentry.Handlers.errorHandler()); // Aqui está sendo setado o (errorHandler), que rastreia os erros.

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


