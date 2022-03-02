import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User> // Aqui foi criado a função (findByEmail), que recebe o parametro (email) e seu tipo que é (string), também é passdo o seu retorno (Promise<User>), que significa que essa é uma função é assíncrona e aponta para a entidade (User), função essa que está sendo chamada no arquivo (CreateUserUseCase).
    findById(id: string): Promise<User>; // aqui foi criado a função (findById), para poder usar para fazer a validação se o usuário existe no BD, no arquivo (ensureAuthenticated.ts).

}

export { IUsersRepository };