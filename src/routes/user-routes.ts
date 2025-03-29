import { Router } from "express";
//import { authenticator } from "../middlewares/authenticator";
import {UserController} from '../controllers/user-controller';

const route : Router = Router()
//sinup user

route.post('/', UserController.create);

//singin user
//update user
//get user

export default route;