import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm/index";

// Essa let recebe a função (Connection) do typeorm.
let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        // Aqui espera a conexão com o BD estabelecer.
        connection = await createConnection();

        // Aqui após conectar o bd roda as (migrations).
        await connection.runMigrations();

        const id = uuid();
        const password = await hash("admin", 8);

        // Cria o usuário (ADM).
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxx')`
        );
    });

    afterAll(async () => {
        // Aqui após os testes exclui a tabela
        await connection.dropDatabase();

        // Fecha a conexão com o BD.
        await connection.close();
    });

    // Teste verifica se é possível criar uma nova category, sendo usuário ADM.
    it("Should be able to create a new category", async () => {

        // Cria o usuário ADM na rota(sessions).
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        // Aqui recupera o token do usuário.
        const { refresh_token } =  responseToken.body;

        // Cria =a categoria na rota(categories).
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}` // Verifica se o usuário é ADM pelo (token).
        })

        expect(response.status).toBe(201);
    });

    // Teste que verifica se é possível criar uma category com o (name) já existente.
    it("Should not be able to create a new category with name exists", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin"
        });

        const { refresh_token } =  responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        expect(response.status).toBe(400);
    });
});