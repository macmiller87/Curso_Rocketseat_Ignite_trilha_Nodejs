import { Request, Response } from 'express' // Aqui está sendo importado o express, com os métodos (Request, Response) para poder usar na função createCourse().
import CreateCourseService from './CreateCourseService' // Aqui está sendo importado o arquivo (CreateCourseService.ts) com seu conteúdo dele mesmo.

export function createCourse(req: Request, res: Response) { // Aqui a função foi adicionado o export, para poder ser utilizada no arquivo server.ts, na rota app.get().

    CreateCourseService.execute({ // Aqui está sendo chamado a função CreateCourseService() e passando o valor dos objetos que foram definidos no arquivo CreateCourseService, e usado a função execute() para executar essa função.

        name: "NodeJs",
        educator: "Dani",
        duration: 10

    });


    CreateCourseService.execute({

        name: "ReactJs",
        educator: "Diego",

    });

    return res.send();
    
}