import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string;

}

@injectable()
class AuthenticateUserUseCase {  
    constructor(@inject("UsersRepository") private userRepository: IUsersRepository) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {

        
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!");         
        }

        // Aqui está sendo usado a função (compare) da lib (bcryptjs), para fazer a comparação entre a senha criada pelo usuário
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // Aqui esta sendo usado a função (sign()) da lib (jsonwebtoken), para fazer a autenticação do usuário.
        const token = sign({}, "7c3ef5a44d0cae90dc699db22182a57c", {
            subject: user.id, // Método para fazer a comparação pelo (ID) do usuário.
            expiresIn: "1D" // Método para informar a duração do token gerado.
        });

        // Aqui foi criado essa const e passando a interface (IResponse), para poder controlar o acesso aos parametros de retorno, que nesse caso serão o name e eamil, que será retornado no (json) da requisição.
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        };

        return tokenReturn;
    }
}
                                                                                
export { AuthenticateUserUseCase };                      