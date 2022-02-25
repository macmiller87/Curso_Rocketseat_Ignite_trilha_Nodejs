import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";


interface IUsersRepository {
    create(data: ICreateCategoryDTO): Promise<void>;


}


export { IUsersRepository };