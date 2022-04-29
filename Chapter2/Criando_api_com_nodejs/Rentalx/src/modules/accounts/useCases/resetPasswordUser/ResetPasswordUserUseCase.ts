import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider,
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {

        // Verifica o token do usuário.
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);

        if(!userToken) {
            throw new AppError("Token Invalid!");    
        }

        // Compara o (token), com relação a data que expira, com a data atual.
        if(this.dayjsDateProvider.compareIfBefore(userToken.expires_date, this.dayjsDateProvider.dateNow())) {
            throw new AppError("Token expired!");
        }

        // Pega o (id do Token) do usuário.
        const user = await this.usersRepository.findById(userToken.user_id);

        // Faz a hash/incrypta a senha do usuário. 
        user.password = await hash(password, 8);

        // Cria um novo (ID) para o usuário.
        await this.usersRepository.create(user);

        // Deleta o (ID) anterior do usuário.
        await this.usersTokensRepository.deleteById(userToken.id);

    }
}

export { ResetPasswordUserUseCase };