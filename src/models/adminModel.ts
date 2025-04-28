import { Pool } from "pg";

export class adminModel{
    private pool;

    constructor(pool: Pool){
        this.pool = pool;
    };

    public async get(){
        
    }

    public async update(){

    }
}