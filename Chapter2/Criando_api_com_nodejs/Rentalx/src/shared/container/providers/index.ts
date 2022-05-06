import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { IStorageProvider } from "./StorageProvider/IStoregeProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider() // Foi necessário usar o (registerInstance) e instância o (EtherealMailProvider()), para poder conseguir fazer a injeção de dependência no usecase.
);

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
);