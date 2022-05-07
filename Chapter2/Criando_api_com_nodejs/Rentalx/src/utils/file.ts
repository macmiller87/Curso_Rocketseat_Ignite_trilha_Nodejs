import fs from "fs"; // Módulo interno do próprio Nodejs

// Essa cons é responsavel pela verificação do arquivo de upload, se ele existe ou não.
export const deleteFile = async(filename: string) => {

    try {
        await fs.promises.stat(filename);
    }catch {
        return;
    }
    await fs.promises.unlink(filename);
};