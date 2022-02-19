import { createConnection, getConnectionOptions } from "typeorm"; // Aqui está sendo importado o typeorm do BD

// Aqui está sendo criada a nterface e setando o seu atributo host
interface IOptions {
    host: string;
}

// Função para conectar o BD POSTGREE
getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    createConnection({
      ...options,
    });
});