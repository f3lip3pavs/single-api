import path from "path"

// interface Iuser {
//     id: number;
//     name: string;
//     email: string;
// }

// abstract class teste {
//     teste: string;

//     constructor(teste: string){
//         this.teste = teste
//     }

//     getTeste(){}
// }

// class User implements Iuser {
//     id: number;
//     name: string;
//     email: string;

//     constructor(id: number , name: string, email: string){
//         this.id = id;
//         this.name = name;
//         this.email = email;
//     }

//     getUser(){
//         console.log(this.id, this.name, this.email)
//     }
// }

// const user1 = new User(123, 'felipe', 'felipe@gmail.com');

// user1.getUser()

const dir = path.join(__dirname, __filename);
console.log(dir)