import { Email } from "../classes/Email";
import { Password } from "../classes/Password";

export interface IUser {
    readonly name : string;
    readonly user_password : string;
    readonly email : string;
    readonly img?: string | null | undefined;
};