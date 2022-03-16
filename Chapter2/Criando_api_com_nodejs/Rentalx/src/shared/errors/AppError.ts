// Aqui foi criado essa classe para padronizar todos os (throw new error) da aplicação, podendo repassar um o status do erro padronizado nas msg, ou quando não informado ele já pega como padrão o (400).
export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}