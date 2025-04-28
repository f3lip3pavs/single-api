import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export async function tokenGenerator(payload: object) : Promise<string> {

    try{
        const token : string = sign(payload, process.env.SECRET_KEY as string, {expiresIn: "1h"});
        return token
    }catch{
        throw Error("Error generating token: on tokenGenerator function");
    };
};