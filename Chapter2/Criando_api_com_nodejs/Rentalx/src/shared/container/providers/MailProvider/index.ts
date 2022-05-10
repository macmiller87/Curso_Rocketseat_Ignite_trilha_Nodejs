import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

// Essa condição está sendo usada para testar o envio de email tanto localmente, quanto através do (ses AWS).
const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider), // local 
    ses: container.resolve(SESMailProvider) // aws 
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);

// Essa condição está sendo usada para testar o envio de email localmente.
container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider() // Foi necessário usar o (registerInstance) e instância o (EtherealMailProvider()), para poder conseguir fazer a injeção de dependência no usecase.
);