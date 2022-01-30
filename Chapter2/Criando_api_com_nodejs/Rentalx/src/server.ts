import express from "express";
import { router } from "./routes";

const app = express();
app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

app.use(router); // Aqui foi setado o (router), que está no arquivo index.ts de rotas da aplicação. 

app.listen(8080, () => console.log('Server is running!'));


