import React from 'react';
import Chats from './chat/chats/chats';
import Messages from './chat/messages/messages';
import Logout from './chat/chats/logout';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    render() {


        return (
            <div className="wrapper">
                <div className="add_chat_icon">
                    <Link to='add-chat' >
                        <i className="fa fa-plus-circle" aria-hidden="true" title="Add new chat"></i>
                    </Link>
                </div>
                <div className="chat_users">
                    <Link to='chat-info' >
                        <i className="fa fa-user" aria-hidden="true" title="Chat info"></i>
                    </Link>
                </div>
                <div className="chat_user_info">
                    <Link to='user-info' >
                        <i className="fa fa-info-circle" aria-hidden="true" title="User info"></i>
                    </Link>
                </div>
                <Logout />
                <Chats />
                <Messages />
            </div>
        )
    }
}

