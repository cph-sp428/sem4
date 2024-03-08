import { useReducer } from "react";
import { countReducer } from "./reducers/reducers";

function Counter() {

    const [count, dispatch] = useReducer(countReducer, 0);


    return ( 
        <>
            <button onClick={() => dispatch('INCREMENT')}>Increment</button>
            <button onClick={() => dispatch('DECREMENT')}>Decrement</button>
            <p>Count: {count}</p>

        </>
     );
}

export default Counter;