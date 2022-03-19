import { ICreateCarDTO } from "../dtos/ICreateCarDTO";


interface ICarsRepository {

    create(date: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };