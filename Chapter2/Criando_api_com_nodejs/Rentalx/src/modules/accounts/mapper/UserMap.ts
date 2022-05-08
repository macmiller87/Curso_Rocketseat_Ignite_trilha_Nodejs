import { IUserRenponseDTO } from "../dtos/IUserRenponseDTO";
import { User } from "../infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer";

// Essa clase foi criada para mapear o retorno do (json) para o usuário.
class UserMap {

    static toDTO({ email, name, id, avatar, driver_license, avatar_url }: User): IUserRenponseDTO {

        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url // Função que vem da entidade (User);
        });

        return user;
    }
}

export { UserMap };