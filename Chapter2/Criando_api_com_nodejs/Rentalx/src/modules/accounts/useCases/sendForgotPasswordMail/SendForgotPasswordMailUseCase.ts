import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

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

        // Aqui está sendo passado o caminho na aplicação onde está sendo estilizado o corpo do (email).
        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

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

        // Aqui está sendo passado o (name) do usuário e a (url) para o reset da senha.
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        // Envia o email de recuperação de senha.
        await this.etherealMailProvider.sendMail(email, 
            "Recuperação de senha",
            variables, // reapassdo ao corpo do email.
            templatePath // reapassdo ao corpo do email.
        );
    }
}

export { SendForgotPasswordMailUseCase }; 