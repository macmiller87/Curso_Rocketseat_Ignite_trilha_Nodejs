import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {

   async handle(req: Request, res: Response): Promise<Response> {
       const {expected_return_date, car_id} = req.body;
       const { id } = req.user; // O usuário logado vem de sobeescrever o método do express (@tipes\expres\index.d.ts), que pega o (Id) do usuário.
       
       const createRentalUsecase = container.resolve(CreateRentalUseCase);

       const rental = await createRentalUsecase.execute({
           car_id,
           expected_return_date,
           user_id: id,
       });

       return res.status(201).json(rental);
   }

}

export { CreateRentalController };