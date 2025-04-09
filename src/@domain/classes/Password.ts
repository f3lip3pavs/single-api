export class Password {
    
    private password : string;

    constructor(password: string){
        if(typeof password != "string"){
            throw Error('The password must be a string!');
        }

        const count : number = password.split("").length;

        if(count < 8){
            throw Error('The password must be longer than 8 characters!');
        };


        this.password = password;
    }

    public value() : string{
        return this.password
    }
}