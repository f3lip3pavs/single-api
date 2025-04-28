import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from 'dotenv'
import { NextFunction, Response, Request } from "express";

dotenv.config()

export function authenticator(req: Request, res: Response, next: NextFunction) : void {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.send({error: "Invalid access token"});
    };

    try {
        const decoded : JwtPayload | string = verify(token as string, process.env.SECRET_KEY as string);
        req.userid = decoded;
        console.log("token decodificado: ", decoded);
        next()
    } catch (error) {
        res.send({error: `error authenticating user: ${error instanceof Error ? error.message : "error authenticating user"}`});
    }
}