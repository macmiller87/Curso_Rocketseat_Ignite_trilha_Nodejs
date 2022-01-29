import { Category } from '../model/category'; // Aqui está sendo importando a função (Category), para poder trabalhar com as definições da classe (Category) do arquivo (category.ts).
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[]; // Aqui está sendo setado no array (categories) como private , o modelo esperado dos atributos da classe (Category), que esta na (pasta model) => arquivo (category.ts).

    // Aqui foi criado (private static INSTANCE: CategoriesRepository), para instanciar a classe.
    private static INSTANCE: CategoriesRepository;

    // Esse construtor é tem a responsabilidade de receber os atributos do array (categories), foi adicionado o private, por causa do (private static INSTANCE: CategoriesRepository).
    private constructor() {
        this.categories = [];
    }

    // Aqui foi criado  o (getInstance()), para insatnciar a classe.
    public static getInstance(): CategoriesRepository {

        if(!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
    }

    // Aqui foi criado a função create() que vai criar os objetos do array (category), e também foi desestruturado os parametros (name, description), e está recebendo a interface (ICreateCategoryDTO), e passando seu método (Void), que significa vazio.
    create({ name, description }: ICreateCategoryDTO) : void {

        const category = new Category();
    
        // Aqui está sendo usada a função Object.assign() para passar o objeto (category), para o array (categories), já com o modelo esperado e definido pela classe Category.
        Object.assign(category, { 
            name,
            description,
            created_at: new Date(),
        });
    
        this.categories.push(category);
    }

    // Aqui foi criado a função list(), e passado o objeto (Category) que foi criado acima, e dando um return no array (categories).
    list(): Category[] {
        return this.categories;
    }

    // Aqui foi criado a função (findByName), para poder fazer a validação se o nome já existe ou não. 
    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name );
        return category;

    }
}

export { CategoriesRepository };