import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

@injectable()
class EtherealMailProvider implements IMailProvider {

    // Cria o client.
    private client: Transporter;

    // Cria o corpo da autorização do servidor de email (nodemailer).
    constructor() {
        nodemailer.createTestAccount().then(account => {
            const Transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            // Referência o client
            this.client = Transporter;

        }).catch(err => console.log(err));
    }

    // Cria o corpo do email.
    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            text: body,
            html: body
        });

        // Traz o (ID) do email de recuperação de senha no terminal.
        console.log('Message sent: %s', message.messageId);
        // Traz a (url) do email de recuperação de senha no terminal, para poder vizualizar na web.
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };