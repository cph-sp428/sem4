import { useQuery } from "@apollo/client";
import { GET_PEOPLE, GET_ADDRESSES } from "../data/queries";
import { Address, Person } from "../data/types";
import { useMutation } from "@apollo/client";
import { DELETE_ADDRESS } from "../data/mutations";

function AddressTable() {

    const { loading, error, data } = useQuery(GET_ADDRESSES);

    const [deleteAddress] = useMutation(DELETE_ADDRESS, {
        refetchQueries: [{ query: GET_PEOPLE }, { query: GET_ADDRESSES }],
    });

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>

    return (  
        <div id="address-table">
            <h3>ADDRESS TABLE:</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Person Ids</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {data.addresses.map((address: Address) => (
                    <tr key={address.id}>
                        <td>{address.id}</td>
                        <td>{address.street}</td>
                        <td>{address.city}</td>
                        <td>{address.state}</td>
                        <td>{address.zip}</td>
                        <td>
                        {address.people?.map((id) => (
                            <p >{id}</p>
                        ))}
                        </td>
                        <td>
                            <button onClick={() => deleteAddress({variables: {id: address.id}})}>DELETE</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AddressTable;