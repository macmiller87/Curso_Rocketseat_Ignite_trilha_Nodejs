import { Connection, createConnection, getConnectionOptions } from "typeorm";

// Aqui está sendo criada a interface e setando o seu atributo host
// interface IOptions {
//     host: string;
// }

// Função para conectar o BD POSTGREE (esse modela precisa dar o import no (index.ts)).
// getConnectionOptions().then(options => {
//     const newOptions = options as IOptions;
//     newOptions.host = 'database'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//     createConnection({
//       ...options,
//     });
// });

// Função para conectar o BD POSTGREE, (que já está sendo exportada).
export default async(host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      // Aqui nessa linha está sendo colocado uma verificação para a trabalhar com o BD de teste, no arquivo (package.json), no script de test incluir (NODE_ENV=test), para poder rodar o BD de teste.
      database: 
        process.env.NODE_ENV === "test" 
          ? "rentex_test" 
          : defaultOptions.database,
    })
  );
};