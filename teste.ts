import { Email } from "./src/models/type-objects/Email";
import { Password } from "./src/models/type-objects/Password";
import { Value } from "./src/models/type-objects/Value";

const password = new Password("12345678")
const email = new Email("felipepavan@gmail.com.br");
const value = new Value('59.99')


console.log(email.getEmail())
console.log(password.getPassword())
console.log(value.getValue())