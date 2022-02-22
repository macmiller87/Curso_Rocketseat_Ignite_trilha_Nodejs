import { getRepository, Repository } from 'typeorm';
import { Category } from '../../entities/category'; // Aqui está sendo importando a função (Category), para poder trabalhar com as definições da classe (Category) do arquivo (category.ts).
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>; // Aqui está sendo passado como privado o (repository), que vai dar acesso privado a category.

    // Esse construtor é tem a responsabilidade de receber os atributos do array (categories), foi adicionado o private, por causa do (private static INSTANCE: CategoriesRepository).
    constructor() {
        this.repository = getRepository(Category); // Aqui está sendo setado o (repository), e usando o método (getRepository(Category)), que é um método do Typeorm, para peagr as informações da categoy.
    }

    // Aqui foi criado a função create() que vai criar os objetos do array (category), e também foi desestruturado os parametros (name, description), e está recebendo a interface (ICreateCategoryDTO), e passando seu método (Void), que significa vazio, juntamente com o (Promise), por que esse é um método assincrono, que necessita sempre do (async e await).
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    
        const category = this.repository.create({
            description,
            name,
        });
       
        await this.repository.save(category);
    }

    // Aqui foi criado a função list(), e passado o objeto (Category) que foi criado acima, e dando um return no array (categories), após a refatoração para trabalhar com o BD, virou uma função assícrona.
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    // Aqui foi criado a função (findByName), para poder fazer a validação se o nome já existe ou não, após a refatoração para trabalhar com BD, virou uma função assícrona, (obs: está sendo usado a função (findOne) que serve como se fosse um select na tabela (repository), passando o parametro name), para poder fazer a verificaçãp se o name esxiste.
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;

    }
}

export { CategoriesRepository };