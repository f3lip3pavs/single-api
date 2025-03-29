import { Request, Response } from "express";
import { pool } from "../config/connectionDB";
import { UserModel } from "../models/userModel";
import { QueryResult } from "pg";
import { User } from "../@types/classes/User";


const userModel: UserModel = new UserModel(pool);

export class UserController {

    public static async create(req: Request, res: Response): Promise<void> {
        
        try{
            const user = new User(req.body);

            if(!user.isValid()){
                throw Error("the IUser interface format is invalid")
            }

            const response: QueryResult = await userModel.create(req.body);
            res.send({response: response.rows[0]});
        }catch(err){

            if(err instanceof Error){
                res.status(400).send({error: err.message})
            }
        };
    };
}