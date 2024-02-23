import { useMutation } from "@apollo/client";
import { ADD_PERSON_ADDRESS } from "../data/mutations";
import { useState } from "react";
import { GET_PEOPLE, GET_ADDRESSES } from "../data/queries";

function AddPersonToAddressForm() {
  
  const [personId, setPersonId] = useState("");
  const [addressId, setAddressId] = useState("");

  const [addPersonToAddress] = useMutation(ADD_PERSON_ADDRESS, {
    refetchQueries: [{ query: GET_PEOPLE }, { query: GET_ADDRESSES }],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPersonToAddress({variables: { personId: personId, addressId: addressId}});
    setPersonId("");
    setAddressId("");
  };

  return (
    <div>
      <h3>Add Person To Address</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Person ID:
          <input type="text" name="personId" value={personId} onChange={(e) => setPersonId(e.target.value)}/>
        </label>
        <label>
          Address ID:
          <input type="text" name="addressId" value={addressId} onChange={(e) => setAddressId(e.target.value)}/>
        </label>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}

export default AddPersonToAddressForm;
