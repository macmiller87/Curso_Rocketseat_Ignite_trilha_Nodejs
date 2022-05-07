import { IStorageProvider } from "../IStoregeProvider";
import { S3 } from "aws-sdk";
import { resolve } from "path";
import upload from "@config/upload";
import fs from "fs";
import mime from "mime"; 

class S3StorageProvider implements IStorageProvider {

    // Cliente do (AWS S3).
    private client: S3;

    // Aqui está sendo passado o endereço da região para (AWS S3).
    constructor() {
        this.client = new S3({ region: process.env.AWS_BUCKET_REGION });
    }

    // Função que salva os arquivos 
    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        // Le o arquivo
        const fileContent = await fs.promises.readFile(originalName);

        // Parametro com endereço do arquivo.
        const ContentType = mime.getType(originalName);

        // Faz o push do arquivo para o (AWS S3).
        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType

        }).promise();

        await fs.promises.unlink(originalName);

        return file;
    }

    // Função que deleta os arquivos
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file

        }).promise();
    }
}

export { S3StorageProvider };