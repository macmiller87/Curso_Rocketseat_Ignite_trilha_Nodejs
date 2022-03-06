import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
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

        if(user.avatar) {
            
            await deleteFile(`./tmp/avatar/${user.avatar}`); // Aqui está chamando a função (deleteFile), que tem a função de verificar se o arquivo de upload já existe, se der falso, então o fluxo aqui segue, (obs: esse cara aqui (./tmp/avatar/) é o endereço da pasta onde está sendo salvo o avatar)
        }

        // Aqui está refeenciando a coluna da tabela (users)
        user.avatar = avatar_File;

        await this.usersRepository.create(user);
    }
}


export { UpdateUserAvatarUseCase };