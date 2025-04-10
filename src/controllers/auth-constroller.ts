import { Request } from "express";
import { Response } from "express";
import { AuthModel } from "../models/authModel";
import { pool } from "../config/connectionDB";
import { Password } from "../@domain/classes/Password";
import { Email } from "../@domain/classes/Email";

const authModel: AuthModel = new AuthModel(pool);

export class Auth {

    public static async login(req: Request, res: Response) {
        
        try {
            const {email, user_password} = req.body;
    
            const e = new Email(email);
            const pass = new Password(user_password)
            
            const response = await authModel.connect(e, pass);
            res.send({message: response.rows[0]});
            
        } catch (err) {

            res.status(400).send({error: err instanceof Error ? err.message : "unknown error"});
        }
    }
}