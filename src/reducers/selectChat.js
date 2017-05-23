const initialState = null;

export default function selectChat( state = initialState, action) {
    if (action.type === 'SELECT_CHAT') {
        return action.payload;
        
    }
    return state;
}