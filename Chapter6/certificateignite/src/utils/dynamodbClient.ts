import { DynamoDB } from "aws-sdk";

// Aqui está sendo passado as instruções de acesso do (db), localmente.
const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "x",
    secretAccessKey: "x"
}

// Aqui está sendo passado o parâmetro para acesso no (db). via (AWS).
const isOffline = () => {
    return process.env.IS_OFFLINE;
}

// Aqui sendo feita uma verificação de status de conexão, (se localmente ou pela AWS).
export const document = isOffline() 
    ? new DynamoDB.DocumentClient(options) 
    : new DynamoDB.DocumentClient();