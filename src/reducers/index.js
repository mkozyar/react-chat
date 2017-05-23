import { combineReducers } from 'redux';

import sendMsgAction from './sendMsg';
import chats from './chats';
import filterChat from './filterChat';
import selectChat from './selectChat';
import hideChats from './hideChats';
import login from './login'

export default combineReducers({
    login,
    sendMsgAction,
    chats,
    filterChat,
    selectChat,
    hideChats
});