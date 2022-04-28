import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

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
    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {

        // Aqui está sendo pego o corpo do email, e convertido para (string) com o (fs).
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        // Aqui está sendo utilizado o (templateParse), com (handlebars.compile) para compilar a string acima.
        const templateParse = handlebars.compile(templateFileContent);

        // Aqui está sendo passado o conteúdo compilado acima para dentro ad (variables).
        const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHTML // Aqui repassando ao corpo do email.
        });

        // Traz o (ID) do email de recuperação de senha no terminal.
        console.log('Message sent: %s', message.messageId);
        // Traz a (url) do email de recuperação de senha no terminal, para poder vizualizar na web.
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };