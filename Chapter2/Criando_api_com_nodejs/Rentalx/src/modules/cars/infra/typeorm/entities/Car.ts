import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./category";

@Entity("cars")
class Car {

   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   description: string;

   @Column()
   daily_rate: number;

   @Column()
   available: boolean;

   @Column()
   license_plate: string

   @Column()
   fine_amount: number;

   @Column()
   brand: string;

   // Aqui foi criado esse (category), para unir a coluna abaixo a (category_id)e também a refêrencia com a tabela (categories).
   @ManyToOne(() => Category)
   @JoinColumn({ name: "category_id"})
   category: Category;

   @Column()
   category_id: string;

   @CreateDateColumn()
   created_at: Date

   constructor() {
      if(!this.id) {
         this.id = uuidV4();
         this.available = true;
      }
   }
}

export { Car };