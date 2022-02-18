import express from "express";
import swaggerUi  from "swagger-ui-express"; // Aqui está sendo importado o Swagger.
import { router } from "./routes";
import swaggerFile from "./swagger.json"; // Para este import precisa colocar no arquivo (tsconfig.json), a opção ("resolveJsonModule": true) desse jeito.

import "./database/index"; // Aqui está sendo importado o arquivo index, que faz a conexão com o BD.

const app = express();

app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // Aqui está sendo setado os parametros padrão para utilização so swwager.

app.use(router); // Aqui foi setado o (router), que está no arquivo index.ts de rotas da aplicação. 

app.listen(8080, () => console.log('Server is running!'));


