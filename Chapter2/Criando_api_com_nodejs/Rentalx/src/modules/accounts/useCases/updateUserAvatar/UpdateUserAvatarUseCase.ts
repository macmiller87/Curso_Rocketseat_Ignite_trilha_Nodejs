import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStoregeProvider";

interface IRequest {
    user_id:  string;
    avatar_File: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("StorageProvider") private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatar_File }: IRequest): Promise<void> {
        const user =  await this.usersRepository.findById(user_id);

        // Deleta o avatar na pasta (avatar), se o mesmo já existir
        if(user.avatar) {
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        // Salva o avatar na pasta (avatar)
        await this.storageProvider.save(avatar_File, "avatar");

        // Aqui está refeenciando a coluna da tabela (users)
        user.avatar = avatar_File;

        await this.usersRepository.create(user);
    }
}


export { UpdateUserAvatarUseCase };