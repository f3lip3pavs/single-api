import { Pool, QueryResult } from "pg";
import { IUser } from "../@types/interfaces/IUser";

export class UserModel {

    private pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    };

    public async create(user: IUser) : Promise<QueryResult>{   

        const {name, user_password, email, img} = user;

        try{
            const query = "INSERT INTO Users (user_name, user_password, img, email) VALUES ($1, $2, $3, $4) RETURNING *";
            return this.pool.query(query, [name, user_password, img, email])
        }catch(err){
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }
}