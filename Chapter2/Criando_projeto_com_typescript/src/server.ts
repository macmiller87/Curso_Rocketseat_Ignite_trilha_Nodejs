import express from 'express'; // Aqui está sendo importado o express
import { createCourse } from './routes'; // Aqui está sendo importado a funçao (createCourse) do arquivo (routes.ts)

const app = express();

app.get("/", createCourse) // Aqui está sendo passado na rota a função (createCourse)

app.listen(8080);