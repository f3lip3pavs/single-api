# Comece por aqui

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

🎯 **Objetivo do projeto**: O único objetivo do projeto presente nesse repositório é servir como estudo.

📌 **Sobre o projeto**: O Single é um projeto de e-commerce voltado exclusivamente para desktop. O nome foi escolhido por representar a ideia de algo singular. Como mencionado anteriormente, este projeto é apenas um experimento, e por isso, todos os produtos cadastrados na aplicação devem seguir uma única regra: serem completamente inúteis.

⚙️**Faetures**: A ideia a principio é criar uma aplicação simples mas com todos os recursos basicos que um e-commerce necessita. Neste repositorio vou me restringir a apresentar apenas os recursos do backend que já foram ou ainda serão desenvolvidos, são eles:

- [x] Inicio: organizar o projeto
- [x] Criar os servidor
- [x] Criar o banco de dados e suas tables
- [x] Criar a função de migration
- [ ] Criar as classes e interfaces
- [ ] Criar as rotas da applicação
- [ ] Criar os controllers
- [ ] Criar os middlewares de autenticação

### 📝 Acompanhamento do Projeto
O progresso do desenvolvimento está documentado no artigo:
📖 [Single: the e-commerce aplication](https://clear-fountain-726.notion.site/Single-the-e-commerce-aplication-1b0350aa283780ffa0dff2a481e87a1d?pvs=4)

Lá, compartilho os desafios enfrentados, as decisões tomadas (como a escolha do banco de dados e tecnologias utilizadas) e detalhes sobre a implementação. Este README será atualizado regularmente com os avanços mais recentes publicados no artigo.

# 🔄 Última atualização: 17 de Março

### ✔️ Feito:
- Concluí a função migration

### ⚠️ Dificuldades:

- sigo sem conseguir o comportamento que preciso, que é um retorno vazio ou 0;
- Erros no código SQL;
- Função de timestamp;

Como sugeri anteriormente, testar outra estrutura de loop realmente teve um efeito positivo no código e fez funcionar como o esperado. Eu utilizei um for() loop comum. Isso resolveu o problema de conseguir o retorno vazio ou não vazio que eu precisava para validar se a migration ja estava registrada na tabela.

Aqui esta o trecho do codigo que foi alterado de map() para for():

```tsx
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
```

Aparentemente o map() estava passando por todos índices do array ‘SQLfiles’ sem conseguir executar a 5º linha a tempo, mesmo que o callback passado para a função map() fosse assíncrono. Mas, com a estrutura for() o comportamento seguiu como esperado.

Alguns erros no código SQL também surgiram durante o processo, mas a maioria eram erros de sintaxe que são facilmente resolvidos com um pouco de logica. Porem, dois erros interessantes se destacam e vale a pena descreve-los: 

- Ordem de execução dos arquivos sql;
- Atualização em tempo real no banco de dados;

### Ordem de execução dos arquivos sql

Me deparei com um problema, que olhando agora parece obvio e simples, mas é muito importante ser esclarecido. É importante ficar atento a ordem de execução dos arquivos SQL, pois se você tentar executar um arquivo que possui uma chave estrangeira que ainda não foi criada, isso vai retornar um erro, vou usar como exemplo o caso que aconteceu comigo:

Se eu tentar executar esse arquivo, antes de criar as tabelas Users e Products, me retornara um erro por conta das lihas “user_id INT REFERENCES Users(user_id)” e “product_id INT REFERENCES Products(product_id)”

```sql
CREATE TABLE IF NOT EXISTS Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    product_id INT REFERENCES Products(product_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

O correto é criar as tabelas Users e Products antes de Orders:

```sql
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    img BYTEA,
    email VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
CREATE TABLE IF NOT EXISTS Products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    product_value DECIMAL(12,2) NOT NULL,
    amount INT NOT NULL,
    product_description VARCHAR(1000) NOT NULL,
    img BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Por esse motivo criei um método para organizar os arquivos, com certeza deve existir uma forma melhor de fazer isso, mas como eu precisava de algo fácil, simples e rápido, serviu para mim. Sempre antes do nome dos arquivos SQL, eu coloquei um código, em que os primeiros dígitos  representam a ordem em que deve ser executado e o segundo a versão. No momento meu código está assim:

```
src/
	database/
		migrations/
			01_Migration.sql
			11_Users.sql
			21_Products.sql
			31_Order.sql
		migrations.ts
```

Como expliquei antes, o primeiro digito representa a ordem em que será executado. O arquivo 01_Migration.sql recebe o código 01, em que o numero mais a esquerda (0) coloca esse arquivo em primeiro lugar na fila de execução, ou seja, no código 11 o numero mais a esquerda é o 1, e por isso será executado após o 0, e assim por diante.

Os novos códigos que forem criados para atualizar tabelas ou outras informações no banco de dados,  deveram estar em arquivos separados, logo, uma mesma tabela pode ter vários arquivos que a atualizam. Por esse motivo, o segundo numero mais a direita representa a versão do código, ou seja, o arquivo 21_products.sql é a primeira versão (1). Caso seja feita alguma atualização nessa tabela, como adicionar uma coluna, deletar uma coluna, etc, o numero mais a direita (1) deverá ser incrementado em 1, no caso, ficaria 22_Products.sql.