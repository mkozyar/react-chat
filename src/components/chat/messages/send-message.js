import React from 'react';
import { connect } from 'react-redux';
import {API_CONFIG} from '../../../API.config';

class SendMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            chatId: ''

        }


    }
    inputValue(e) {
        e.preventDefault();
        this.setState({ text: e.target.value });

    }

    sendMsg(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');


        let myInit = {
            method: 'post',
            headers: { myHeaders },
            mode: 'cors',
            body: JSON.stringify({
                text: this.state.text,
                chatId: this.props.selectedChat.name,
                sentAt: new Date(),
                sender: this.props.login.login,
                avatar: this.props.login.avatar,
            })
        }
        if(this.state.text !== '' && this.props.selectedChat.name){
            fetch(`API_CONFIG.CHATS/${this.props.selectedChat.name}`, myInit)
            .then(() => {
                console.log('Sending OK!');
                
            });
            this.setState({ text: '' })
        }
        console.log(this.props.login.login)
    }

    render() {

        return (
            <div className={this.props.hideChats ? "chat" : "chat_hide"}>
                <div className="write_msg">
                    <form action="">
                        <textarea
                            placeholder="Type something..."
                            onChange={this.inputValue.bind(this)}
                            value={this.state.text}
                             />
                        
                    </form>
                    <i className="fa fa-paper-plane" aria-hidden="true" onClick={this.sendMsg.bind(this)}></i>
                </div>
            </div>

        )

    }
}



export default connect(
    state => ({
        selectedChat: state.selectChat,
        hideChats: state.hideChats,
        login: state.login
    }),
    dispatch => ({
        onSendMsg: (msg, toId, fromId) => {
            dispatch({ type: "SEND_MSG", payload: msg, to: toId, fromId });
        }
    })
)(SendMessage);