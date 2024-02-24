export class Person {
  private readonly name: string;
  private readonly age: number;
  private readonly gender: Gender;

  constructor(
    private _name: string,
    private _age: number,
    private _gender: Gender,
  ) {
    this.name = _name;
    this.age = _age;
    this.gender = _gender;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getGender(): Gender {
    return this.gender;
  }
}

export enum Gender {
  MALE,
  FEMALE,
}
