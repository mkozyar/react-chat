const initialState = ''

export default function filterChat(state = initialState, action) {
    if (action.type === 'FIND_CHAT') {
        return action.payload;
    }
    return state;
}