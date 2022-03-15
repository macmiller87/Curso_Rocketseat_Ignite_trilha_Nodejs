import { parse as csvParse } from "csv-parse"; // Aqui está sendo importado o (parse), e foi renomeado para (csv-parse);

import fs from "fs"; // Aqui está sendo instalado a lib (FS), que já é nativa do Nodejs, sem a necessidade de instalar, essa lib é para leitura de arquivos.
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Aqui foi criado a interface para passar os parametros que a classe (ImportCategoryUseCase) vai ter.
interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {

        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path); // Aqui está sendo passado a função (createReadStream(file.path)) padrão para a leitura de arquivos.

            const categories: IImportCategory[] = []; // Array que vai receber os dados que o arquivo vai receber.
    
            const parseFile = csvParse(); // Aqui está sendo setado a funçaõ (csvParse()), que é responsável por ler linha por linha do arquivo repassado. 
    
            stream.pipe(parseFile); // Aqui está sendo usado a função (pipe), que recebe cada pedaço da leitura do arquivo através do (stream).
    
            parseFile.on("data", async (line) => {
                const [name, description] = line; // Aqui está sendo desestruturado o parametro que a linha vai receber.
    
                categories.push({
                    name, 
                    description,
                }); 
            })
            .on("end", () => { // Aqui está sendo usado a função .on() assim que a Promisse for resolvida e não tiver erro, vai repassar para (categories).
                fs.promises.unlink(file.path); // Aqui está sendo passado fs.promises.unlink() e o file.path como parametro, que não deixa duplicar o arquivo lido na pasta TMP,
                resolve(categories);
            })
            .on("error", (err) => { // // Aqui está sendo usado a função .on() assim que a Promisse for resolvida e se tiver erro, a Promisse vai ser rejeitada.
                reject(err);
            });
        });
    }
    
         async execute(file: Express.Multer.File): Promise<void> { // Aqui foi criado a função (execute) passando o (file: Express.Multer.File) como parametro, usando o async por causa que a classe é uma função Promisse.

            const categories = await this.loadCategories(file); // Aqui está sendo usado o await, para aguardar a Promisse ser resolvida.
            console.log(categories);

            // Aqui foi craido essa logica para verificar se o (name e a description) existe ou não.
            categories.map(async (category) => {
                const { name, description } = category;

                const existCategory = await this.categoriesRepository.findByName(name);

                if(!existCategory) {
                    await this.categoriesRepository.create({
                        name,
                        description,
                    });
                }
            });
        }
}

export { ImportCategoryUseCase };