import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe("Send Forgot Mail", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dayjsDateProvider,
            mailProviderInMemory
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {

        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "236960",
            email: "ga@ohroro.et",
            name: "Thomas Lopez",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("ga@ohroro.et");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email, if user does not exists", async () => {

        await expect(
            sendForgotPasswordMailUseCase.execute("dujrobcud@sehuzih.mq")

        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {

        // Função do própio (jest) (jest.spyOn()), que serve para verificar se algum método foi chamado.
       const generateTokenInMemory = jest.spyOn(usersTokensRepositoryInMemory, "create");

       await usersRepositoryInMemory.create({
            driver_license: "675818",
            email: "gube@nacpumnu.sx",
            name: "Duane Osborne",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("gube@nacpumnu.sx");

        expect(generateTokenInMemory).toBeCalled();
    });

});