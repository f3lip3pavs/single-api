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

# **🔄** 24 de Março

---

### ✅ Feito:

- Middleware de autenticação com Json Web Token;
- Crei as duas primeiras rotas para teste

### **⚠️** Dificuldades:

- Por conta da tipagem, o Middleware não se conportava da maneira certa. Consiguir adicionar novos parametros no objeto Request demorou banstante, o retorno da função estava errado tbm, precisa ser void. e o problema de passar process.env.SECRET_KEY na função sign.
- realizar requisição do tipo get. Por algum motivo não esta funcionando (aparentemete, precisa reiniciar o servidor)

Bom, para começar, vamos entender como funciona a autenticação JWT no contexto dessa aplicação: De forma simples, o JWT é enciptação de um objeto json. Ele permite que as informações chave/valor, que no padrão JWT são chamadas de claims, de um json sejam transmitidas via HTTP. Para mais informações veja a [**RFC 7519**](https://datatracker.ietf.org/doc/html/rfc7519) que apresenta a documentação completa do Json Web Token  

Um JWT tem o seguinte formato: (Header.Payload.Signature)

`eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9`.`eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ`.`dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk`

Uma requisição de autenticação é feita para o servido, onde as credencias serão verificadas. Após a verificação, caso seja bem sucedida, um objeto json contendo as informações senciveis que os serviços irão precisar é encriptado usando o algoritmo de encriptamento HS256 (pode ser usado o padrão RSA256 tbm), transformando o objeto json em um token JWT. 

![image.png](attachment:c4128559-3b46-4912-b247-13b36c328379:image.png)

Após obter o token JWT, as requisições serão feitas passando o token no header da requisição. Ao chegar no servidor, o token é desencriptado devolvendo um objeto json, e dessa forma os serviços conseguem acessar dados sensiveis como um id de usuario.

![image.png](attachment:48eaed66-bd30-464c-8697-38ec3a629664:image.png)

Para construir o middleware de autenticação, enfreitei um problema meio chato. A minha ideia era receber o token JWT no meu middleware, desencriptalo, obter os dados da usuario em um json e repasar esses dados para o proximo middleware pela requisição. Mas a interface Request do Express, não possui um atributo como “userid” ou “username”, ou seja, preciso criar esses parametros, mas como?

A principio, eu pensei em estendar a interface Request e adicionar os parametros que eu precisava:

```tsx
import Request from 'express'

interface IRequest extends Request {
	userid: string,
	username: string
}
```

E isso funciona! Mas, eu descobri que é possivel adicionar atributos diremente em uma interface através do `namespace`. Para isso, é necessario declarar `global` , o namespace em si e a interface:

```tsx
import Request from 'express'

declare global {
	namespace Express{
		interface IRequest extends Request {
			userid: string,
			username: string
		}
	}
}

```

Dessa forma os atributos userid e username são adicionados em Request, o que eu achei incrivel, pois permite continuar usarndo o type Request no projeto inteiro. E devemos ter atenção! O arquivo onde esse codigo fica declarado, deve ser renomeado com a estenção .d.ts, que são arquivos para definição de tipos do typescript. Chamei esse arquivo de “express.d.ts”, não é o melhor nome, mas não consegui pensar em nada melhor na hora.

Dessa forma, a função ficou assim: (A função não vai ficar assim, mas essa é uma forma de entender o funcionamento dela como um todo)

```tsx
export function authenticator(req: Request, res: Response, next: NextFunction) : void {
    //const key : any = process.env.SECRET_KEY; usar de exemplo no artigo

    const token : string = sign({mock: "id"}, process.env.SECRET_KEY as string, {expiresIn: "1h"});

    try{
        const decoded : JwtPayload | string = verify(token, process.env.SECRET_KEY as string);
    
        req.userid = decoded;
        res.send({message: req.userid})
        
        next()
    }catch{
        res.send()
    }
}
```

Tem dois detalhes aqui que tbm são importantes: O middleware sermpre deve ser uma função sem retorno do tipo void. E eu tbm estava com problemas para declarar `process.env.SECRET_KEY`. Apesar do segundo paremetro da função sign aceitar um string `process.env.SECRET_KEY` ser um string, a função não estava aceitando, então tentei resolver o problema declarando a SECRET_KEY dentro de uma variavel com o tipo any e passando essa variavel como parametro da função 

`const key : any = process.env.SECRET_KEY` . Mas tinha um jeito muito mais simples que era fazendo um casting declarando `process.env.SECRET_KEY` como uma string: 

`process.env.SECRET_KEY as string`

<aside>
🧃

## Juice

`Adicionar propriedades em uma interface existente`  `casting de dados`

</aside>