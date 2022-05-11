import { IUserRenponseDTO } from "@modules/accounts/dtos/IUserRenponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute(id: string): Promise<IUserRenponseDTO> {

        const user = await this.usersRepository.findById(id);

        // Esse retorn já vai mapeado pela classe (UserMap).
        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase };