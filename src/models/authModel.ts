import { Pool } from "pg";
import { Password } from "../@domain/classes/Password";
import { Email } from "../@domain/classes/Email";

export class AuthModel {
    private pool: Pool;

    constructor(pool: Pool){
        this.pool = pool;
    };

    public async connect(email: Email, password: Password){
        try {
            const query = "SELECT * FROM Users WHERE email = $1 AND user_password = $2";
            return this.pool.query(query, [email.value(), password.value()]);
        } catch (err) {
            throw Error(`Error in AuthModel class: ${err instanceof Error ? err.message : "unknown error"}`)
        }
    }
}