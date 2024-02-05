// (1) basic types

let num: number = 5;
let bool: boolean = true;
let str: string = "hello";
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let a: any = 5;
a = "hello";
a = true;

// (2) enums

enum days {
  mon,
  tue,
  wed,
  thu,
  fri,
  sat,
  sun,
}

enum days2 {
  mon = "monday",
  tue = "tuesday",
  wed = "wednesday",
  thu = "thursday",
  fri = "friday",
  sat = "saturday",
  sun = "sunday",
}

// days as tuples
let mon: [string, number] = ["monday", 1];

// (3) classes

class Person {
  private _name: string;
  private readonly _email: string;
  private _age: number;

  constructor(name: string, email: string, age: number) {
    this._name = name;
    this._email = email;
    this._age = age;
  }

  get name(): string {
    return this.name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this.email;
  }

  get age(): number {
    return this.age;
  }

  set age(age: number) {
    this._age = age;
  }
}

let p: Person = new Person("Sebastian", "sebastianmandrup@outlook.com", 26);
p.name = "Sebastian Mandrup";

class Employee extends Person {
  private _salary: number;

  constructor(name: string, email: string, age: number, salary: number) {
    super(name, email, age);
    this._salary = salary;
  }

  get salary(): number {
    return this._salary;
  }

  set salary(salary: number) {
    this._salary = salary;
  }
}

let e: Employee = new Employee(
  "Sebastian",
  "sebastianmandrup@outlook.com",
  26,
  10000
);

// (4) type assertions convert any to string

let someValue: any = "this is a string";
if (someValue instanceof String) {
  let strLength: number = (<string>someValue).length;
  console.log(strLength);
}

// (5) functions with types

function add(x: number, y: number): number {
  return x + y;
}

// (6) tuples

let okStatus: [number, string] = [200, "OK"];
let notFoundStatus: [number, string] = [404, "Not Found"];
let badStatus: [number, string] = [500, "Internal Server Error"];

let person: [string, string, number] = ["Sebastian", "email", 26];

// (7) union types

function printPerson(name: string, email: string, age: number | string) {
  console.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
}

printPerson(person[0], person[1], person[2]);
printPerson(p.name, p.email, p.age);

// (8) generics

function firstElement<Type>(arr: Type[]): Type {
  return arr[0];
}

function mergeObjects<Type1, Type2>(obj1: Type1, obj2: Type2): Type1 & Type2 {
  return { ...obj1, ...obj2 };
}

// (9)Array Types

let arr1: Array<number> = [1, 2, 3];

let board: Array<Array<string>> = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

// (10)exclamation mark

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
let lemgth: number = myString!.length;

// (11) question mark

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
type PersonTwo = {
  name: string;
  age?: number;
};

// Create a person object with an age property
// Create a person object without an age property

let personOne: PersonTwo = { name: "John", age: 20 };
let personTwo: PersonTwo = { name: "Jane" };

// (12) unions

function printSomething(value: string | number): string | number {
  if (typeof value === "string") {
    return value;
  } else {
    return value * 2;
  }
}

// (13) type assertions

let anyValue: any = "this is a string";
if (typeof anyValue === "string") {
  let anyStringValue = <string>anyValue;
}

// using either 'as' or '<>' syntax
let myDiv = document.getElementById("myDiv") as HTMLDivElement;
let myDiv2 = <HTMLDivElement>document.getElementById("myDiv");

// (14) combined literal types and union types

function getDircetions(
  directions: "north" | "south" | "east" | "west"
): number {
  if (directions === "north") {
    return 1;
  } else if (directions === "east") {
    return 2;
  } else if (directions === "south") {
    return 3;
  } else {
    return 4;
  }
}

// (15) in operator narrowing

type human = {
  eat: () => void;
  walk: () => void;
};

type alien = {
  eat: () => void;
  fly: () => void;
};

function checkSpecies(species: human | alien) {
  if ("walk" in species) {
    return species.walk;
  } else {
    return species.fly;
  }
}

// (16) instanceof narrowing

class PersonClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class CarClass {
  make: string;
  model: string;
  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

let personObj = new PersonClass("Sebastian", 26);

let carObj = new CarClass("Toyota", "Corolla");

function getName(obj: PersonClass | CarClass) {
  if (obj instanceof PersonClass) {
    return obj.name;
  } else {
    return obj.make;
  }
}

// (17) type predicates

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

// write a type predicate to narrow the type of the fish parameter

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function howToMove(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

// (18) index signature

interface PersonInterface {
  name: string;
  [key: string]: any; // Index signature for additional properties
}

const myPerson: PersonInterface = {
  name: "John",
  age: 25,
  // You can add more properties here if needed
};

console.log(myPerson);

// (19) intersection types 

interface PersonInterface {
  name: string;
}

interface StudentInterface {
    studentId: number;
}

function createStudent(person: PersonInterface, student: StudentInterface): PersonInterface & StudentInterface {
    return {...person, ...student};
}