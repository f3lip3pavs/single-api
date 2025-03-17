import { pool } from "../config/connectionDB";
import fs from "fs"
import path from "path";

async function runMigration(){

    //iniciar conexão
    pool.connect()
    .then(async () =>{
        
        //criar table migration caso não exista
        await pool.query(
            `CREATE TABLE IF NOT EXISTS Migrations (
                migration_id SERIAL PRIMARY KEY,
                migration_name VARCHAR(30),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        );

        //encontrar arquivos sql
        const migrationDir = path.join(__dirname, 'migrations');
        const SQLfiles = fs.readdirSync(migrationDir).sort();

        let i:number;
        
        for(i=0; i<SQLfiles.length;i++){
            
            //busca o arquivo na tabela migration
            console.log("current file: ", [SQLfiles[i]]);
            let result = await pool.query("SELECT migration_name FROM Migrations WHERE migration_name = $1", [SQLfiles[i]]);
            
            //verifica se o arquivo existe
            if(result.rows.length == 0){

                //retorna o caminho para o arquivo
                let filePath = path.join(migrationDir, SQLfiles[i]);
                console.log("file path to insert: ", filePath)
                
                //le o arquivo
                let sql = fs.readFileSync(filePath, 'utf8');
                console.log("data file: ", sql)
                
                //exucuta o arquivo sql
                await pool.query(sql);
                await pool.query("INSERT INTO Migrations (migration_name) VALUES ($1)", [SQLfiles[i]]);
            }
            
            console.log('migration completed successfully')
        }
    })
    .catch(e => {console.log(e)})
    .finally(async () => {
        
        //encerrar conexão
        await pool.end()
    });
};

runMigration()