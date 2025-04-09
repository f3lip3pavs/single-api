import { error } from "console";

export class Email {

    private email: string

    constructor(email: string){

        const isValid : boolean = /^[a-z.0-9]+[@][a-z]+\.[a-z]{2,}(\.[a-z]{2,})?$/i.test(email)

        if(!isValid){
            throw new Error("Invalid email");
        }
        
        this.email = email;
    }

    public value() : string {
        return this.email;
    }
}