import { IMailProvider } from "../IMailProvider";

// Foi criado essa clase somente para usar no teste (SendForgotPasswordMailUseCase.spec.ts).
class MailProviderInMemory implements IMailProvider {

    private message: any[] = [];

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        this.message.push({
            to,
            subject,
            variables,
            path
        });
        
    }
}

export { MailProviderInMemory };