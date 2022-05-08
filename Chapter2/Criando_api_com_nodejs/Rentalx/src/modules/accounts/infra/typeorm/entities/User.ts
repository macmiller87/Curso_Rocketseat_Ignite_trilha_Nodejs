import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    // Foi criado esse (switch case) para poder expor a (avatar_url) do usuário, de forma (local) e pelo (s3 aws), utilizando o metódo (Expose) da lib (class-transformer).
    @Expose({ name: "avatar_url" })
    avatar_url(): string {

        switch(process.env.DISK) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;     
        }
    }

    constructor() {
        if(!this.id) {
           this.id = uuidV4();
        }
    }
}

export { User };