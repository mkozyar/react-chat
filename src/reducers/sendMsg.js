const initialState = [
    { from: 1, to: 1, msg: 'asdsakdsad' },
    { from: 2, to: 2, msg: 'ghghkkghgh' },
    { from: 1, to: 3, msg: 'dfgdsfs sdfsd fsdfssdsssssssssssss dddddd sdddddddddddddddddddddddassd asssssssssddddddddddddddddddd fdfdfdfdfd fdfd ddfgfg' },
    { from: 2, to: 1, msg: 'vbnss bnvb' },
    { from: 3, to: 2, msg: 'vbnvbnvbnb' }
];

export default function sendMsgAction(state = initialState, action) {
    if ((action.type==="SEND_MSG")&&(action.payload !== '')&&(action.to !== null)) {
        return [
            ...state,
            {from: 12, to: action.to, msg: action.payload }
        ];
    }
    return state;
}