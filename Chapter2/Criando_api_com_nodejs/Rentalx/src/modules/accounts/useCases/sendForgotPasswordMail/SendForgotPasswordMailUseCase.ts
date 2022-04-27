import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider,
        @inject("EtherealMailProvider") private etherealMailProvider: IMailProvider 
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("User does not exists!");
        }

        // Gera o tokenId (ID),para identificar o usuário
        const token = uuidV4();

        // Adiciona a quantidade de horas para expirar o link de recuperação da senha.
        const expires_date = this.dayjsDateProvider.addHours(3);

        // Identifica o usuário
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date  
        });

        // Envia o email de recuperação de senha.
        await this.etherealMailProvider.sendMail(email, 
            "Recuperação de senha", `O Link para o reset è ${token}` 
        );
    }
}

export { SendForgotPasswordMailUseCase };