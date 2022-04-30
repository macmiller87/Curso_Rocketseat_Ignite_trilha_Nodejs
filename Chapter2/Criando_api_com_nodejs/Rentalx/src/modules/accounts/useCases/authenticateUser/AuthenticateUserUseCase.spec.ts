import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    // Cria e autentica o usuário.
    it("Should be able to authenticate an user", async () => {

        const user: ICreateUserDTO = {
            driver_license: "0001234",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    // Caso de teste que sempre vai passar, exemplo, pois não está fazendo verificação.
    it("Should not be able to authenticated an nonexistent user", async () => {

        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

    // Caso de teste que sempre vai passar, exemplo, pois não está fazendo verificação.
    it("Should not be able to aunthenticate with incorrect password", async () => {

        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "user@user.com",
            password: "1234",
            name:  "User Test Error"
        }

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });

});