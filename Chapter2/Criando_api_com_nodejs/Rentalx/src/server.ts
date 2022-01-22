import express from "express";
import { categoriesRoutes } from "./routes/categories.routes"; // Aqui está sendo importada a rota do arquivo (categoriesRoutes) de dentro da pasta routes.

const app = express();

app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.
app.use(categoriesRoutes); // Aqui está sendo setado o categoriesRoutes, para poder usar as rotas.

app.listen(8080, () => console.log('Server is running!'));


