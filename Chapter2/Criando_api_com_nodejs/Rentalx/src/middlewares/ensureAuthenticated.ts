import { NextFunction } from "express";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

// Aqui foi criado essa interface para poder manipular o token do usuario na verificação da função middleware (ensureAuthenticated), abaixo
interface IPayload {
    sub:  string;
}

// Aqui foi criado essa função que vai ser como um middleware, para poder fazer as verificações a seguir.
export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    // Nessa const, vai ser passado o token, via header de rota, usando a função de verificação da rota (Barer), no insommnia, também está sendo usado a função (authorization), que é nativa do express, elá vai fazer a comparação se o token exist.
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new Error("Token missing!");
    }

    // Aqui o token vai ser colocado dentro desse array, está sendo ignorado o (sub) que vem na rota, e está sendo armazenado no array só o token, // a função split(), vai fazer a separação do (sub e token).
    const [, token] = authHeader.split(" "); 

    // Aqui está desetruturado o (sub: user_id)  sendo usado a função (verify), da lib (jsonwebtoken), sendo passado o (token que está sendo pego na rota) o (md5 , 7c3ef5a44d0cae90dc699db22182a57c) que foi criado para fazer a validação do token, e por fim a interface criada acima.
    try {
      const { sub: user_id } = verify(token, "7c3ef5a44d0cae90dc699db22182a57c") as IPayload;      
        
      // Aqui está sendo chamado o arquivo (UsersRepository), para poder dar acesso a implementação que está sendo tratada la, no caso a verificação do (id), do usuário, se existe no BD. 
      const usersRepository = new UsersRepository(); 

      // Aqui está sendo comparado se o id existe no BD, como mencionado acima.
      const user = await usersRepository.findById(user_id);

      if(!user) {
          throw new Error("User does not exists!");
      }

      next();

    } catch{
        throw new Error("Invalid token!");       
    }
    
}