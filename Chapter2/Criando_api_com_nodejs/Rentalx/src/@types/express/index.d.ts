// Aqui foi criado essa classe para sobrescrever uma request do próprio (express), para ser usada no arquivo (ensureAuthenticated.ts), quando precisar fazer esse tipo de procedimento, o arquivo tem que ter a extensão (.d.ts).
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}