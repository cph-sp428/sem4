// basic types

let num: number = 5;
let bool: boolean = true;
let str: string = "hello";
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let a: any = 5;
a = "hello";
a = true;

// enums

enum days {mon, tue, wed, thu, fri, sat, sun};

enum days2 {
    mon = "monday",
    tue = "tuesday",
    wed = "wednesday",
    thu = "thursday",
    fri = "friday",
    sat = "saturday",
    sun = "sunday"
}

// days as tuples
let mon: [string, number] = ["monday", 1];


// classes

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

let p: Person = new Person("Sebastian","sebastianmandrup@outlook.com", 26);
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

let e: Employee = new Employee("Sebastian", "sebastianmandrup@outlook.com", 26, 10000);

// type assertions convert any to string

let someValue: any = "this is a string";
if(someValue instanceof String) {
    let strLength: number = (<string>someValue).length;
    console.log(strLength);
}

// functions with types

function add(x: number, y: number): number {
    return x + y;
}

// tuples

let okStatus: [number,string] = [200, "OK"];
let notFoundStatus: [number,string] = [404, "Not Found"];
let badStatus: [number,string] = [500, "Internal Server Error"];

let person: [string, string, number] = ["Sebastian", "email", 26];

// union types

function printPerson(name: string, email: string, age: number | string) {
    console.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
}

printPerson(person[0], person[1], person[2]);
printPerson(p.name, p.email, p.age);

// generics

function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
}

function mergeObjects<Type1, Type2>(obj1: Type1, obj2: Type2): Type1 & Type2 {
    return {...obj1, ...obj2};
}

// Array Types

let arr1: Array<number> = [1, 2, 3];

let board: Array<Array<string>> = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
];
