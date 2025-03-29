import { JwtPayload, sign, verify } from "jsonwebtoken";
import dotenv from 'dotenv'
import { NextFunction, Response, Request } from "express";

dotenv.config()

export function authenticator(req: Request, res: Response, next: NextFunction) : void {

    const token : string = sign({mock: "id"}, process.env.SECRET_KEY as string, {expiresIn: "1h"});

    try{
        const decoded : JwtPayload | string = verify(token, process.env.SECRET_KEY as string);
    
        req.userid = decoded;
        res.send({message: req.userid})
        
        next()
    }catch{
        res.send()
    }
}