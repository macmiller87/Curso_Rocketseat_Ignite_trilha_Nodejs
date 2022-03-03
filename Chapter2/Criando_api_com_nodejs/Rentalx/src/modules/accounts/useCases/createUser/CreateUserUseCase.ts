import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exixts");
            
        }

        // Aqui foi criado a const (passwordHash), e passado a função (Hash(password, 8)), com o parametro password da senha que vai ser criada, para poder criptografar a senha.
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash, // Aqui foi passdo a const acima como parametro e condção para criação.
            driver_license,
        });
    }
}

export { CreateUserUseCase };