import {Gender, Person} from "./person";

const people = [
    new Person("Steve", 25, Gender.MALE),
    new Person("Michell", 19, Gender.FEMALE),
    new Person("Patrick", 17, Gender.MALE),
    new Person("Claus", 55, Gender.MALE),
    new Person("Benjamin", 12, Gender.MALE),
    new Person("Laura", 33, Gender.FEMALE),
    new Person("Isabella", 12, Gender.FEMALE),
    new Person("Emily", 15, Gender.FEMALE),
    new Person("Jonathan", 13, Gender.MALE),
]

const table = document.getElementById("table") // missing html element
const header = document.getElementById("header")
const button = document.getElementById("button")
const btn = document.createElement("button")
btn.innerHTML = "Sort";

if(button) button.appendChild(btn);

const helloWorld = (name: string) => {
    return `Hello from ${name}`;
};

if (header instanceof HTMLHeadElement)header.innerHTML = helloWorld("TypeScript");

const createTable = (array: Person[]) => {
    array.forEach((person) => {
        const row = document.createElement("tr") // missing html element
        row.innerHTML = `
        <td>${person.getName()}</td>
        <td>${person.getAge()}</td>
        <td>${person.getGender()}</td>
    `;
        table!.appendChild(row);
    });
}

createTable(people);

let toggle = false;
btn.addEventListener("click", () => {

    if (toggle && table) {
        table.innerHTML = "";
        createTable(sortPeopleAscending(people));
        toggle = !toggle;
    } else if(table){
        table.innerHTML = "";
        createTable(sortPeopleDescending(people));
        toggle = !toggle;
    }
}
);

const sortPeopleDescending = (array: Person[]) => {
    return array.sort((a, b) => {
        if (a.getName() < b.getName()) {
            return -1;
        }
        if (a.getName() > b.getName()) {
            return 1;
        }
        return 0;
    });
}

const sortPeopleAscending = (array: Person[]) => {
    return array.sort((a, b) => {
        if (a.getName() < b.getName()) {
            return 1;
        }
        if (a.getName() > b.getName()) {
            return -1;
        }
        return 0;
    });
};

