import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokemResponse {
    refresh_token: string;
    token: string;
    
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokemResponse> {
        
        // Recebe os parametros da interface, e a função (verify), faz a verificação se o token existe pelo (email eo sub). 
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

        // Pega o (id) do usuário
        const user_id = sub;

        // faz a verificação pelo (id) e o (token).
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);
       
        if(!userToken) {
           throw new AppError("Refresh Token does not exists!");
        }

        // Se o token existir, Deleta o token do usuário, para não ter mais de um refreshToken no BD.
        await this.usersTokensRepository.deleteById(userToken.id);

        // Aqui está sendo passado os parametros necessários para criar o refresh do token.
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token  
        });

        // Adiciona o tempo de validade do token em dias.
        const expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days);

        // Cria o refreshtoken.
        await this.usersTokensRepository.create({
            user_id,
            refresh_token,
            expires_date 
        });

        // Aqui está sendo passado os parametros necessários para criar o newToken.
        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token 
        });

        // Retorno que vai aparecer no (insomnia).
        return {
            refresh_token,
            token: newToken
        }
    }
}

export { RefreshTokenUseCase };