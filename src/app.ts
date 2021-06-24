enum Role {
  ADMIN,
  USER,
} // enum

const person: {
  name: string;
  hobbies: string[];
  role: [number, string]; //tuple
  role2: Role;
} = {
  name: "john",
  hobbies: ["sports", "cooking"],
  role: [1, "admin"],
  role2: Role.ADMIN,
};

// union type
let x: string | number;
x = 2;
x = "";

//type alias
type Combinable = string | number;
type Combinable2 = "as-number" | "as-text"; //literal types

function add(num1: number, num2: number): number {
  return num1 + num2;
}

function printGreeting(name: string): void {
  console.log("hi there " + name);
}

let fun: (a: string) => void; // Function type
fun = printGreeting;

let userName: string;

let userInput: unknown; // unkonwn type
if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  //type never (crash)
  throw { message, errorCode: code };
}

generateError("an error occured!", 500);




///// commands
// tsc --init -> tsconfig.json
// tsc --w (watch mode)