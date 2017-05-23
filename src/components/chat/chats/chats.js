
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import ChatNav from './chat-nav';
import ChatList from './chat-list';

class Chats extends React.Component {


    isSelected(s) {
        this.props.onSelectChat(s)
    }


    render() {

        return (
            <div className={this.props.hideChats ? "contacts" : "contacts contacts_hide"}>

                <ChatNav />

               <ChatList />

            </div>

        )
    }
}
export default connect(
    state => ({
         hideChats: state.hideChats
    })
)(Chats);