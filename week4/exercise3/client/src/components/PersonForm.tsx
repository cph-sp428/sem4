import { useMutation } from "@apollo/client";
import { ADD_PERSON } from "../data/mutations";
import { GET_PEOPLE } from "../data/queries";
import { useState } from "react";
import { Person } from "../data/types";

function PersonForm() {

    const defaultPerson: Person = {
        name: "",
        email: "",
        age: 0,
        addresses: []
    };

    const [person, setPerson] = useState(defaultPerson);

    const [createPerson, createPersonResponse] = useMutation(ADD_PERSON, {
        refetchQueries: [{query: GET_PEOPLE}]
    });

    if(createPersonResponse.loading) return <p>Loading...</p>

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createPerson({variables: { name: person.name, email: person.email, age: person.age}});
        setPerson(defaultPerson);
    };

    return (  
        <div id="person-form">
            <h3> PERSON FORM: </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} />
                </label>
                <label>
                    Email:
                    <input type="text" value={person.email} onChange={(e) => setPerson({ ...person, email: e.target.value })} />
                </label>
                <label>
                    Age:
                    <input type="number" value={person.age} onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value) })} />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default PersonForm;