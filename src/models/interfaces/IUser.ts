import { Email } from "../type-objects/Email";
import { Password } from "../type-objects/Password";

export interface IUser {
    name : string;
    user_password : Password;
    img : string;
    email : Email;
};