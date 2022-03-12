import { AppError } from "../../../../errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory:  CategoryRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInMemory);       
    });

    // Verifica se a category foi criada.
    it("Should be able to create a new category", async () => {
        
        const category = {
            name: "Category Test",
            description: "Category description Test" 
        }

        await  createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoryRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");

    });

    // Verifica se a category já existe.
    it("Should not be able to create a new category with the same name", async () => {

        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Test" 
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});