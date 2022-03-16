import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }
    
    async create({ name, email, driver_license, password, avatar, id }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        });

        await this.repository.save(user);
    }
    
    // Aqui foi criado essa implementação para fazer a verificação do (email) do usuário.
    async findByEmail(email: string): Promise<User> {
        const user =  await this.repository.findOne({ email });
        return user;
    }

    // Aqui foi criado essa implementação para fazer a verificação do (id) do usuário.
    async findById(id: string): Promise<User> {
        const user =  await this.repository.findOne(id);
        return user;
    }

}

export { UsersRepository };