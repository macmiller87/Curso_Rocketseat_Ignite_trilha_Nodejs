import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStoregeProvider";

// Aqui foi criado essa const para repassar o local do upload dos aquivos.
const diskStorage = {
    local: LocalStorageProvider, // local 
    s3: S3StorageProvider // aws 
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
);