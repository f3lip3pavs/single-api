import { Request, Response } from "express";
import { pool } from "../config/connectionDB";
import { UserModel } from "../models/userModel";
import { QueryResult } from "pg";
import { User } from "../@domain/classes/User";


const userModel: UserModel = new UserModel(pool);

export class UserController {

    public static async create(req: Request, res: Response): Promise<void> {
        
        try{

            const user: User = new User(req.body);

            if(!user.isValid()){
                throw Error("the IUser interface format is invalid");
            }

            const response: QueryResult = await userModel.create(req.body);
            res.send({message: response.rows[0]});

        }catch(err){

            if(err instanceof Error){
                res.status(400).send({error: err.message});
            }
        };
    };

    public static async update(req: Request, res: Response): Promise<void> {
        
        try {
            const response = await userModel.update(req.body, req.params.id);
            res.send({message: response});
        } catch (err) {
            if(err instanceof Error){
                res.status(400).send({error: err.message});
            }
        };
    };

    public static async delete(req: Request, res: Response): Promise<void> {

        try {
            const response = await userModel.dalete(req.params.id);
            res.send({message: response});
        } catch (err) {
            if(err instanceof Error){
                res.status(400).send({error: err.message});
            }
        };
    };

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {            
            const users = await userModel.getAll();
            res.send({users: users.rows});
        } catch (err) {
            if(err instanceof Error){
                res.status(400).send({error: err.message});
            }
        };
    };

    public static async getById(req: Request, res: Response): Promise<void> {
        
        try {
            const response = await userModel.getById(req.params.id);
            res.send({user: response.rows});
        } catch (err) {
            if(err instanceof Error){
                res.status(400).send({error: err.message});
            }
        };
    };

}