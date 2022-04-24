import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
    refresh_token: string;

}

@injectable()
class AuthenticateUserUseCase {  
    constructor(
        @inject("UsersRepository") private userRepository: IUsersRepository,
        @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
        @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email);
        const { secret_token, expires_in_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days} = auth;

        if(!user) {
            throw new AppError("Email or password incorrect!");         
        }

        // Aqui está sendo usado a função (compare) da lib (bcryptjs), para fazer a comparação entre a senha criada pelo usuário
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // Aqui esta sendo usado a função (sign()) da lib (jsonwebtoken), para fazer a autenticação do usuário.
        const token = sign({}, secret_token, {
            subject: user.id, // Método para fazer a comparação pelo (ID) do usuário.
            expiresIn: expires_in_token // Método para informar a duração do token gerado.
        });

        // Aqui está sendo passado a função abaixo para fazer o refresh do token
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token // tempo que expira o token 
        });

        // Adiciona o tempo de validade do token em dias.
        const refresh_token_expires_date = this.dayjsDateProvider.addDays(expires_refresh_token_days);

        // Cria o refreshtoken.
        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token
        });

        // Aqui foi criado essa const e passando a interface (IResponse), para poder controlar o acesso aos parametros de retorno, que nesse caso serão o name e eamil, que será retornado no (json) da requisição.
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refresh_token
        };

        return tokenReturn;
    }
}
                                                                                
export { AuthenticateUserUseCase };                      