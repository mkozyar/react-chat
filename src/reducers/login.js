const initialState = null;

export default function login( state = initialState, action) {
    if (action.type === 'LOGIN') {
        return action.payload;
        
    }
    if (action.type === 'LOGOUT') {
        return action.payload = null;
        
    }
    return state;
}