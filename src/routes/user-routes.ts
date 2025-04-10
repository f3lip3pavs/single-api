import { Router } from "express";
//import { authenticator } from "../middlewares/authenticator";
import {UserController} from '../controllers/user-controller';

const route : Router = Router()

//sinup user
route.post('/', UserController.create);


//update user
route.patch("/:id", UserController.update);

//get user
route.get("/", UserController.getAll);

//delete user
route.delete("/:id", UserController.delete);

//get user by id
route.get("/:id", UserController.getById);

//singin user

export default route;