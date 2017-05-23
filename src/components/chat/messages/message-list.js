/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

class MessageList extends React.Component {

    render() {
      
        return (
            <div className={this.props.hideChats? "chat":"chat_hide"}>
                <header>
                    <div id="chat_title">
                        <h1><a href="">My first chat</a></h1>
                    </div>
                </header>
                <div className="chat_wrap">
                    <div className="chat_items">

                        {this.props.messages.map(msg => 
                        (
                            <div className={(msg.sender === this.props.login.login)? "chat_item my_msg":"chat_item"} key={msg._id}>
                                <div className="chat_img">
                                    <img src={msg.avatar} alt="" />
                                </div>
                                <div className="chat_msg">
                                    <span className="sender_user">
                                            {msg.sender}
                                        </span>
                                    <div className="msg">
                                        <span>
                                            {msg.text}
                                        </span>
                                    </div>
                                    <div className="chat_time">
                                        {msg.sentAt.slice(0,10) + '  ' + msg.sentAt.slice(12, 16)}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                
            </div>

        ) 

    }
}

export default connect(
    state => ({
        login: state.login
    }),
    dispatch => ({

    })
)(MessageList);

