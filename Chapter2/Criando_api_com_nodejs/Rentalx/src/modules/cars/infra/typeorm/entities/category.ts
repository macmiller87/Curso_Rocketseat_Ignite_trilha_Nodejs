import { v4 as uuidV4 } from  'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

// Aqui está sendo usado o (@Entity) padrão para referenciar o nome da tabela para o BD.
@Entity("categories") 
class Category {

    @PrimaryColumn() // Aqui está sendo usado o (@PrimaryColumn), que significa que é a PK do BD.
    id?:  string; // Aqui está sendo usado o (?) no id, que passa pra esse método que ele é opcional, ou seja pode ser passdo na rota ou não, se não passado na rota, ele vai ser criado automaticamente.

    // Aqui está sendo usado o (@Column) que significa que essa é uma coluna do BD.
    @Column()
    name: string;

    @Column()
    description: string;

    // Aqui está sendo utilizado o (@CreateDateColumn), que é padrão do (typeorm) para esse atributo (created_at).
    @CreateDateColumn()
    created_at: Date;


    // Essa constructor e para poder fazer a verificação se o id está vindo na rota, ou se ele vai ser gerado automaticamente.
    constructor() { 
       
        if(!this.id) {
            this.id = uuidV4();
        }
    }

}

export { Category };