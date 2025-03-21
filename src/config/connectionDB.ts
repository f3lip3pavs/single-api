import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config();

export const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DBNAME,
    port: Number(process.env.PG_PORT)
})

//port 5432