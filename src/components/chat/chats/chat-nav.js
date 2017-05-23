import React from 'react';
import { connect } from 'react-redux';

class ChatNav extends React.Component {

constructor(props) {
        super(props);
        this.state={
        toggle: false
        }
    }

findChat(){
    this.props.onFindChat(this.findInput.value);
}

toggleControl(){
    this.setState({
    toggle: !this.state.toggle
    })
}


    render() {
       
        return (
           <div className="contacts_header">
               
                    <div id="hide_arrow" className={this.props.hideChats? "":" hide"}>
                        <i className="fa fa-angle-left" aria-hidden="true" onClick={this.props.onHideChats}></i>
                    </div>
                    <div id="show_arrow" className={this.props.hideChats? "":" show"}>
                        <i className="fa fa-angle-right" aria-hidden="true" onClick={this.props.onHideChats}></i>
                    </div>
                    <div className={this.props.hideChats? "search":" hide"}>
                        <form name="search">
                            <input type="text" placeholder="Search" ref={(input) => { this.findInput = input }} onChange={this.findChat.bind(this)} />
                        </form>
                        <i className="fa fa-search" aria-hidden="true" onClick={this.findChat.bind(this)}></i>
                    </div>
                    <div className={this.props.hideChats? "control":" hide"}>
                         <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleControl.bind(this)}></i>
                         {/*<ul className={this.state.toggle? "add_new_chat" : "add_new_chat hide"} >
                            <li onClick={this.toggleControl.bind(this)}>Create new chat</li>
                         </ul>*/}
                    </div>
                </div>
        )
    }
}
export default connect(
    state => ({
        hideChats: state.hideChats
    }),
    dispatch => ({
        onFindChat: (chat) => {
            dispatch({type: "FIND_CHAT", payload: chat});
        },
        onHideChats: () => {
            dispatch({type: "HIDE_CHATS"});
        }
    })
)(ChatNav);