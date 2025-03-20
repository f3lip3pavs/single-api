import { error } from "console";

export class Password {
    
    private password : string;

    constructor(password: string){
        const count : number = password.split("").length;

        if(count < 8){
            throw error({error: 'The password must be longer than 8 characters!'});
        };

        this.password = password;
    }

    public getPassword() : string {
        return this.password;
    }
}