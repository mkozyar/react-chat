import React from 'react';

export default class ChatItem extends React.Component {

    render() {
        return (


            (
                <div className={(this.props.chat.id === this.props.selectedChat) ? "contact_item active" : "contact_item"} onClick={this.isSelected.bind(this, chat.id)} key={chat.id}>
                    <div className="avatar">
                        <img src="img/avatar.gif" alt="" />
                        <span>2</span>
                    </div>
                    <div className={this.props.hideChats ? "contact_name" : " hide"}>
                        <div className="name">
                            {chat.name}
                        </div>
                        <div className="desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </div>
                    </div>
                    <div className={this.props.hideChats ? "time" : " hide"}>
                        52m
                    </div>
                </div>
            )
        )
    }
}
