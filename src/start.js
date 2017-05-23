/* eslint-disable */
import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';

import { Router, browserHistory, Redirect } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
import Auth from './components/auth/Auth';
import AddChat from './components/chat/chats/add-chat';
import ChatInfo from './components/chat/chats/chat-info';
import UserInfo from './components/chat/chats/user-info';
import { connect } from 'react-redux';


class Start extends React.Component {
    render() {
       if(this.props.login){
               var asd = <div>
                   <Route path='/add-chat' component = {AddChat} />
                   <Route path='/chat-info' component = {ChatInfo} />
                    <Route path='/user-info' component = {UserInfo} />
               </div>
            }
        return (
           
    <BrowserRouter history={browserHistory}>
      <div>
        <Route path='/' component={this.props.login? App : Auth} />
       
        {asd}
         
        
      </div>
    </BrowserRouter>
 
        )
    }
}


export default connect(
    state => ({
        login: state.login,
        selectedChat: state.selectChat
    }),
    dispatch => ({

    })
)(Start);