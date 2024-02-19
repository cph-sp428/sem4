import { useMutation } from "@apollo/client";
import { ADD_ADDRESS } from "../data/mutations";
import { GET_ADDRESSES } from "../data/queries";
import { useState } from "react";
import { Address } from "../data/types";

function AddressForm() {

    const defaultAddress: Address = {
        street: "",
        city: "",
        state: "",
        zip: 0
    };

    const [address, setAddress] = useState(defaultAddress);

    const [createAddress, createAddressResponse] = useMutation(ADD_ADDRESS, {
        refetchQueries: [{query: GET_ADDRESSES}]
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createAddress({variables: { street: address.street, city: address.city, state: address.state, zip: address.zip}});
        setAddress(defaultAddress);
    };

    return (  
        <div id="address-form">
            <h3> ADDRESS FORM: </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Street:
                    <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                </label>
                <label>
                    City:
                    <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </label>
                <label>
                    State:
                    <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                </label>
                <label>
                    Zip:
                    <input type="number" value={address.zip} onChange={(e) => setAddress({ ...address, zip: parseInt(e.target.value) })} />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default AddressForm;