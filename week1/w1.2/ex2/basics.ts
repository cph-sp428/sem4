const aNumber : number = 0;
const aString : string = "Hello";
const aBoolean : boolean = true;
const anArray : number[] = [1, 2, 3];
const anyType : any = "Hello";
enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}
enum DaysAsString {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday"
}

class Person{
    private _name : string;
    private _email : string;
    private _age : number;
    constructor(name : string, email : string, age : number){
        this._name = name;
        this._email = email;
        this._age = age;
    }
    get name(){
        return this._name;
    }
    get email(){
        return this._email;
    }
    get age(){
        return this._age;
    }
}

const person : Person = new Person("John", "john@email.com", 25);
console.log(person);

const someAnyValue : any = "Hello";
const someStringValue : string = someAnyValue as string;

function sum(a : number, b : number): number{
    return a + b;
}

// tuples
const statusCodes : [number, string][] = [
    [200, "OK"],
    [400, "Bad Request"],
    [404, "Not Found"],
    [500, "Internal Server Error"]
];

function myFunc(value : number | string){
    if(typeof value === "number"){
        console.log(value * 2);
        return value;
    }
    console.log(value);
    return value;
}

function myFunc2(arr : any[]): any{
    return arr[0];
}


/*
Generics:

Create a generic function that takes an array of any type and returns the first element of the array.
Create a generic function that takes two parameters that extends the type object and returns both object parameters combined.
Array Types

Create an array of numbers. But instead of using the number type, use the array type.
Create a Multidimensional Array of strings to use for the game Tic Tac Toe. The array should have 3 rows and 3 columns. All string values should be "-".
Exclamation Mark

Where in code below would you need to use the exclamation mark to tell TypeScript that a variable is not null or undefined?
 // Part 1
 // A variable that might be null or undefined
 let nullableValue: string | null | undefined = "Hello";

 // Use the exclamation mark to assert that the value is non-null
 let nonNullableValue: string = nullableValue;

 console.log(nonNullableValue); // Output: Hello

// Part 2
// A variable that might be null or undefined
let myString: string | undefined = possibleUndefinedStringFunction();
// Use the exclamation mark to assert that the value is non-null
let lemgth: number = myString.length;
Question mark

Where in code below would you need to use the question mark to tell TypeScript that a variable is optional?
// Part 1
// A function that takes an optional parameter
function printName(name: string) {
  console.log(name);
}

// Call the function without a parameter
printName(); // Output: undefined
// Call the function with a parameter
printName("John"); // Output: John

// Part 2
// A type alias with an optional age property
type Person = {
  name: string;
  age: number;
};

// Create a person object with an age property
// Create a person object without an age property
Unions - Narrowing the Type

Write a function that takes a string or number as a parameter. If the parameter is a string, return the string. If the parameter is a number, return the number multiplied by 2. (use the typeof operator to check the type of the parameter)
Type Assertion

Use type assertion to convert a variable from type any to type string. Use the as keyword and the angle-bracket syntax.
Call a div element with id="myDiv" and convert it to type HTMLInputElement.
Literal Types combined with Union Types

Create a function that takes a string called direction as a parameter. Use literal types to narrow the type of the parameter.
If the direction is "left" return 1, if the direction is "right" return 2, if the direction is "up" return 3, if the direction is "down" return 4. (use a switch statement)
in Operator Narrowing

create two simple type aliases for a human and an alien. Both alias should have a specific function like eat and fly.
create a function that takes in a creator parameter that could be either a person or an alien. Use the in operator to narrow the type of the parameter. When you use the in operator you have to use the function to check if the property exists on the object. If the parameter is a human, return the function belonging to the human otherwise return the function belonging to the alien.
instanceof Operator Narrowing

create two simple objects for a person and a car.
create a function that takes a person or a car as a parameter. Use the instanceof operator to narrow the type of the parameter. If the parameter is a person, return the name property. If the parameter is a car, return the model property.
Type Predicates

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

// write a type predicate to narrow the type of the fish parameter

function howToMove(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
Index Signatures

Create an interface for a person with a name property and an index signature that allows the interface to have additional properties.
Create an object of type person with a name property and an additional property called age.
Intersection Types

Create two interfaces, one for a person and one for a student. The person interface should have a name property and the student interface should have a studentId property.
Create a function that takes a person and a student as parameters. Use intersection types to combine the two interfaces into one. The function should return an object with the properties from both interfaces.
*/