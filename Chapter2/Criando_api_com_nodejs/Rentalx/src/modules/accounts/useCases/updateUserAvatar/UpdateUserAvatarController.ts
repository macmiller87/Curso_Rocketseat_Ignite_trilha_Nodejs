import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

    async handle(req: Request, res: Response) {
        const { id } = req.user; // Aqui está o caso de uso que teve que sobescrever a tipagem do express.

        // Aqui estaá setado nulo pq, o usuário pode ou não passar na requisição.
        const avatar_File = null;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_File });

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController };