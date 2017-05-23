const initialState = true;

export default function hideChats( state = initialState, action) {
    if (action.type === 'HIDE_CHATS') {
        return !state;
        
    }
    return state;
}