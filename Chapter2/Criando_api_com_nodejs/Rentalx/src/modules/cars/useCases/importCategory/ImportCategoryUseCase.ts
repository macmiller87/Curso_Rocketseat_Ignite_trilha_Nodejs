import { parse as csvParse } from "csv-parse"; // Aqui está sendo importado o (parse), e foi renomeado para (csv-parse);

import fs from "fs"; // Aqui está sendo instalado a lib (FS), que já é nativa do Nodejs, sem a necessidade de instalar, essa lib é para leitura de arquivos.

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void { // Aqui foi criado a função (execute) assando o (file: Express.Multer.File) como parametro.

        const stream = fs.createReadStream(file.path); // Aqui está sendo passado a função (createReadStream(file.path)) padrão para a leitura de arquivos.

        const parseFile = csvParse(); // Aqui está sendo setado a funçaõ (csvParse()), que é responsável por ler linha por linha do arquivo repassado. 

        stream.pipe(parseFile); // Aqui está sendo usado a função (pipe), que recebe cada pedaço da leitura do arquivo através do (stream).

        parseFile.on("data", async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };