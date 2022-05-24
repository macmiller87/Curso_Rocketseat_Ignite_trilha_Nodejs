import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient";
import { compile } from "handlebars";
import { join } from "path";
import { readFileSync } from "fs";
import dayjs from "dayjs";
import chromium from "chrome-aws-lambda";
import { S3 } from "aws-sdk";

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

    // Busca e retorna os parâmetros acima.
    const response = await document.query({

        TableName: "users_certificate",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    // Verifica se o certificado emitido possui as mesmas informaçãoes/(usuário).
    const userAlreadyExists = response.Items[0];

    if(!userAlreadyExists) {

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
    };


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

    // Pega o conteúdo (certificado formatado).
    const content = await compileTemplate(data);

    // Cofigurações para permitir a visualização no (chrome).
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath
    });

    // Aguarda página ser carregada.
    const page = await browser.newPage();

    // Após página ser carregada seta o conteúdo na própria página. 
    await page.setContent(content);
    
    // Define as caracteristicas do formatação do pdf. para setar as propriedades do (certificate.hbs).
    const pdf = await page.pdf({
        format: "a4",
        landscape: true,
        printBackground: true,
        preferCSSPageSize: true,
        path: process.env.IS_OFFLINE ? "./certificate.pdf" : null
    });

    // Encerra o browser.
    await browser.close();

    // Cria o objeto (S3 na AWS).
    const s3 = new S3();

    //Exemplo de como criar o (BUCKET), na (AWS), manualmente.
    // await s3.createBucket({
    //     Bucket: "certificateignitenodejs"
    // }).promise();

    // Cria e passa os parâmetros para o (certificado), ser criado na instância (S3 AWS).
    await s3.putObject({
        Bucket: "certificateignitenodejs",
        Key: `${id}.pdf`,
        ACL: "public-read",
        Body: pdf,
        ContentType: "application/pdf"
    }).promise();


    // Traz o retorno da rota.
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Certificado criado com sucesso",
            url: `https://certificateignitenodejs.s3.amazonaws.com/${id}.pdf`
        })
    };

}; 