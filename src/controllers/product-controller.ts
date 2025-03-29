import { Response, Request } from "express";

export function helloworld(req: Request, res: Response): void {
    res.send('hello world')
}