export class Person {

    private readonly name: string;
    private readonly age: number;
    private readonly gender: Gender;

    constructor(name: string, age: number, gender: Gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getGender(): string {
        return this.gender;
    }
}

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}