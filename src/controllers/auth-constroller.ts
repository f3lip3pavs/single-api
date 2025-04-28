import { Request } from "express";
import { Response } from "express";
import { AuthModel } from "../models/authModel";
import { pool } from "../config/connectionDB";
import { Password } from "../@domain/classes/Password";
import { Email } from "../@domain/classes/Email";
import { tokenGenerator } from "../utils/tokenGenerator";

const authModel: AuthModel = new AuthModel(pool);

export class Auth {

    public static async login(req: Request, res: Response) {
        
        try {
            const {email, user_password} = req.body;
    
            const e = new Email(email);
            const pass = new Password(user_password)
            
            const response = await authModel.connect(e, pass);
            const token = await tokenGenerator({user_id: response.rows[0].user_id});

            console.log("token: ", token)
            res.send({user: response.rows[0], token: token});
            
        } catch (err) {

            res.status(400).send({error: err instanceof Error ? err.message : "unknown error"});
        }
    }
}