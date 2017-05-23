/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import SendMessage from './send-message';
import MessageList from './message-list';

 class Messages extends React.Component {

 constructor() {
        super();
        this.state = {
            
            messages: []
        }
         
    }


componentWillUpdate() {
    fetch('http://localhost:3012/messages')
            .then(response => response.json())
            .then(messages => {
                this.setState({ messages: messages.filter(msg => msg.chatId === this.props.selectedChat.name) })
            });
           
 }

    render() {
        return (
            <div className={this.props.hideChats? "chat":"chat_hide"}>
                <MessageList messages = {this.state.messages}/>
                <SendMessage />
            </div>

        ) 

    }
}



export default connect(
    state => ({
       selectedChat: state.selectChat,
       hideChats: state.hideChats
    }),
    dispatch => ({
       
    })
)(Messages);