import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase:  AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUseUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUseUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    // Cria e autentica o usuário.
    it("Should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_license: "0001234",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUseUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    // Caso de teste que sempre vai passar, exemplo, pois não está fazendo verificação.
    it("Should not be able to authenticated an nonexistent user", () => {

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    // Caso de teste que sempre vai passar, exemplo, pois não está fazendo verificação.
    it("Should not be able to aunthenticate with incorrect password", () => {

        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name:  "User Test Error"
            }

            await createUseUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            });

        }).rejects.toBeInstanceOf(AppError);
    });

});