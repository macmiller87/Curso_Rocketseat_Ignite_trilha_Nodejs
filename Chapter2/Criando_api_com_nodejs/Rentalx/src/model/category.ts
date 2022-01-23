import { v4 as uuidV4 } from  'uuid';

class Category {

    id?:  string; // Aqui está sendo usado o (?) no id, que passa pra esse método que ele é opcional, ou seja pode ser passdo na rota ou não, se não passado na rota, ele vai ser criado automaticamente.
    name: string;
    description: string;
    created_at: Date;


    // Essa constructor e para poder fazer a verificação se o id está vindo na rota, ou se ele vai ser gerado automaticamente.
    constructor() { 
       
        if(!this.id) {
            this.id = uuidV4();
        }
    }

}

export { Category };