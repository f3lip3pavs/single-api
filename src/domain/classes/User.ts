import { IUser } from "../interfaces/IUser";
import  {Password}  from "../../@domain/classes/Password";
import { Email } from "../../@domain/classes/Email";

export class User implements IUser {
    readonly name : string;
    readonly user_password : string;
    readonly email : string;
    readonly img?: string | null | undefined;

    constructor(user: IUser) {

        this.name = user.name;
        this.user_password = new Password(user.user_password).value();
        this.email = new Email(user.email).value();
        this.img = user.img;
    }

    public isValid(): boolean {
        return (
            typeof this.name === "string" &&
            typeof this.user_password === "string" &&
            typeof this.email === "string" &&
            (this.img === undefined || this.img === null || typeof this.img === "string")
        );
    }
}