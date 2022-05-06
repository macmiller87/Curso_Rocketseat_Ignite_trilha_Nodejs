import { IStorageProvider } from "../IStoregeProvider";
import fs from "fs";
import { resolve } from "path";
import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider {

    // Método para (salvar local) e mover os uploads de uma pasta para a outra.
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file), // tira de uma pasta
            resolve(`${upload.tmpFolder}/${folder}`, file)// coloca na outra.
        );

        return file;
    }

    // Método para deletar arquivos
     async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            await fs.promises.stat(filename); // Verica se o arquivo existe pelo nome
        }catch {
              return;
            }

        await fs.promises.unlink(filename); // Se a verificação acima for verdadeira, essa função remove o arquivo duplicado.    
    }
}

export { LocalStorageProvider };