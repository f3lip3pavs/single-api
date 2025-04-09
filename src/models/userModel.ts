import { Pool, QueryResult } from "pg";
import { IUser } from "../@domain/interfaces/IUser";
import { Email } from "../@domain/classes/Email";

export class UserModel {

    private pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    };

    public async create(user: IUser) : Promise<QueryResult>{   

        const {name, user_password, email, img} = user;

        try{
            const query = "INSERT INTO Users (user_name, user_password, img, email) VALUES ($1, $2, $3, $4) RETURNING *";
            return this.pool.query(query, [name, user_password, img, email]);
        }catch(err){          
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        };
    };

    public async update(user: IUser, id:number) : Promise<QueryResult> {
        const {name, user_password, img} = user;

        const data = [];

            if(name != undefined){
                data.push("user_name", name);
            };

            if(user_password != undefined){
                data.push("user_password", user_password);
            };

            if(img != undefined){
                data.push("img", img);
            };

        try {
            const query = `UPDATE Users SET ${data[0]} = $1 WHERE user_id = $2`;
            return this.pool.query(query, [data[1], id]);
        } catch (err) {
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }

    public async dalete(id: string): Promise<QueryResult> {
        const userId = Number(id)
        try {
            const query = "DELETE FROM Users WHERE user_id = $1";
            return this.pool.query(query, [userId]);
            
        } catch (err) {
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }

    public async getById(id: string) {
        const userId = Number(id);

        try {
            const query = "SELECT * FROM Users WHERE user_id = $1";
            return await this.pool.query(query, [userId]);
        } catch (err) {
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }

    public async getAll(): Promise<QueryResult> {

        try {
            const query = "SELECT * FROM Users";
            return await this.pool.query(query);
        } catch (err) {
            throw Error(`Error in class UserModel: ${err instanceof Error ? err.message : "Unknown error"}`);
        }
    }
}