

import React from 'react';
import { connect } from 'react-redux';
import {API_CONFIG} from '../../../API.config';

class ChatList extends React.Component {

    constructor() {
        super();
        this.state = {

            chats: [],
        }

    }


    componentDidMount() {
        fetch(API_CONFIG.CHATS)
            .then(response => response.json())
            .then(chats => {
                this.setState({ chats: this.ChatFilterByUser(this.props.login.login, chats) })
            })
    }
    ChatFilterByUser(login, array) {
        var arr = [];
        for (var j = 0; j < array.length; j++) {
            for (var i = 0; i < array[j].users.length; i++) {
                if (array[j].users[i].login === login) {
                    arr.push(array[j]);
                }
            }
        }
        return (arr)
    }


    isSelected(s) {
        this.props.onSelectChat(s);

    }
    isCreator(creator, login) {
        if (creator === login) {
            return true
        } else return false
    }

    deleteChat() {
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');


        let myInit = {
            method: 'delete',
            headers: { myHeaders },
            mode: 'cors',
            body: JSON.stringify({
                id: this.props.selectedChat._id
            })
        }
        fetch(`API_CONFIG.CHATS/${this.props.selectedChat._id}`, myInit)
            .then(() => {
                console.log('Deleting OK!');
            }
            )
    }


    render() {

        return (


            <div className="contact_items" >

                {
                    this.state.chats.filter(chat => chat.name.includes(this.props.filter)).map(chat =>
                        (
                            <div className={(chat === this.props.selectedChat) ? "contact_item active" : "contact_item"} onClick={this.isSelected.bind(this, chat)} key={chat._id}>
                                <div className="avatar">
                                    <img src={chat.avatar} alt="" />
                                    <span className="hide">2</span>
                                </div>
                                <div className={this.props.hideChats ? "contact_name" : " hide"}>
                                    <div className="name">
                                        {chat.name}
                                    </div>
                                    <div className="desc">
                                        {chat.description}
                                    </div>
                                </div>
                                <div className={this.props.hideChats ? "time" : " hide"} className={this.isCreator(chat.creator, this.props.login.login) ? "time" : " hide"} onClick={this.deleteChat.bind(this)}>
                                    X
                            </div>
                            </div>

                        )
                    )
                }
            </div >



        )
    }

}

export default connect(
    state => ({
        login: state.login,
        filter: state.filterChat,
        selectedChat: state.selectChat,
        hideChats: state.hideChats
    }),
    dispatch => ({
        onSelectChat: (chat) => {
            dispatch({ type: "SELECT_CHAT", payload: chat });
        }

    })
)(ChatList);

