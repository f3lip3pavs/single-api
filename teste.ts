import { Password } from "./src/@domain/classes/Password";

let pass = new Password("56765495");

let word = pass.getPassword()

console.log(word)