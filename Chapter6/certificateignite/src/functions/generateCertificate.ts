import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient";
import { compile } from "handlebars";
import { join } from "path";
import { readFileSync } from "fs";
import * as dayjs "dayjs";

interface ICreateCertificate {
    id: string;
    name: string;
    grade: string;
}

interface ITemplate {
    id: string;
    name: string;
    grade: string;
    medal: string;
    date: string;
}

// Aqui é tratado a conversão do Certidicado.
const compileTemplate = async (data: ITemplate) => {

    // Aqui pega o caminho do (certificate.hbs).
    const filePath = join(process.cwd(), "src", "templates", "certificate.hbs");

    // Transforma o template acima, para (utf-8).
    const html = readFileSync(filePath, "utf-8");

    // Traz o retorno do template após (compilar com os parâmetros da interface ITemplate). 
    return compile(html)(data);
}

// Cria a requisição e passa os parâmetros para a geração do template.
export const handler: APIGatewayProxyHandler = async (event) => {

    const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

    // Passa os parâmetros para dentro da tabela do (dynamodb).
    await document.put({

        TableName: "users_certificate",
        Item: {
            id,
            name,
            grade,
            created_at: new Date().getTime()
        }
    }).promise();

    // Busca e retorna os parâmetros acima.
    const response = await document.query({

        TableName: "users_certificate",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    // Aqui pega o caminho do (selo.png), e em seguida trnasforma para (base64).
    const medalPath = join(process.cwd(), "src", "templates", "selo.png");
    const medal = readFileSync(medalPath, "base64");

    // Formata o corpo do template.
    const data: ITemplate = {
        name,
        id,
        grade,
        date: dayjs().format("DD/MM/YYYY"),
        medal
    };

    const content = await compileTemplate(data);

    // Traz o retorno da rota.
    return {
        statusCode: 201,
        body: JSON.stringify(response.Items[0])
    };
}; 