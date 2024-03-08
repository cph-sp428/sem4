
export const countReducer = (state: number, action: string) => {
    switch (action) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            if(state === 0) return state;
            return state - 1;
        default:
            return state;
    }
}