import { container } from "tsyringe"; // // Aqui está sendo usado a função (container), e passado a lib (tsyringe)

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

// Aqui está sendo criado um função tpo um (container), sendo passdo o método (registerSingleton), que recebe como parametro a interface (ICategoriesRepository), na sequência é dado um nome para esse container/função, e passado o (CategoriesRepository), que é a classe.
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);