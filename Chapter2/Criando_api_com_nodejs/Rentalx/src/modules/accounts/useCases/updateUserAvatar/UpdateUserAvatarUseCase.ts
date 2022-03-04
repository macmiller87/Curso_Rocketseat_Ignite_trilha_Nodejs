import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id:  string;
    avatar_File: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ user_id, avatar_File }: IRequest): Promise<void> {
        const user =  await this.usersRepository.findById(user_id);

        // Aqui está refeenciando a coluna da tabela (users)
        user.avatar = avatar_File;

        await this.usersRepository.create(user);
    }
}


export { UpdateUserAvatarUseCase };