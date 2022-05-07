import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStoregeProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider() // Foi necessário usar o (registerInstance) e instância o (EtherealMailProvider()), para poder conseguir fazer a injeção de dependência no usecase.
);

// Aqui foi criado essa const para repassar o local do upload dos aquivos.
const diskStorage = {
    local: LocalStorageProvider, // local 
    s3: S3StorageProvider // aws 
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
);