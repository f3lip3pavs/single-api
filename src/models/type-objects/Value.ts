import { error } from "console";

export class Value {
    private value : string;

    constructor(value : string){
        
        const isValid : boolean = /^[0-9]+(\.[0-9]{2})?$/.test(value)

        if(!isValid){
            throw error({error: 'Invalid Value'});
        }

        this.value = value;
    }

    public getValue() : string {
        return this.value;
    }
}