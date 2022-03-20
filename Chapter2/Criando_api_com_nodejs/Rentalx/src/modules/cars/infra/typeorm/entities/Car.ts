import { v4 as uuidV4 } from "uuid";
class Car {
   id: string;

   name: string;

   description: string;

   daily_rate: number;

   available: boolean;

   license_plate: string

   fine_amount: number;

   brand: string;

   category_id: string;

   created_at: Date

   // Se o (id) for diferente, esse construtor está sentando o uuid, e os metodos abaixo. 
   constructor() {
      if(!this.id) {
         this.id = uuidV4();
         this.available = true;
         this.created_at = new Date();
      }
   }
}

export { Car };