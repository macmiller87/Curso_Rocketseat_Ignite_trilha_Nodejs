import express from "express";
import { categoriesRoutes } from "./routes/categories.routes"; // Aqui está sendo importada a rota do arquivo (categoriesRoutes) de dentro da pasta routes.
import { specificationsRoutes } from "./routes/specification.routes";

const app = express();
app.use(express.json()); // Aqui está sendo setado o express.json, para poder usar.

// Rota de criação do modelo do carro.
app.use("/categories", categoriesRoutes); // Aqui está sendo setado o categoriesRoutes, e foi adicionado um patch => ("/categories"), para ficar como padrão dessa função, e não precisar adicionar na rota no arquivo (categories.routes), apenas adiciona o ("/"), para poder usar essa rota.

// Rota de criação da specificação da categoria do carro.
app.use("/specifications", specificationsRoutes);


app.listen(8080, () => console.log('Server is running!'));


