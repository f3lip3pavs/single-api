import { Router, Response, Request } from "express";
//import {helloworld} from '../controllers/product-controller'
const route = Router()

//add product
//update product
//search product
//get product
route.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

export default route;