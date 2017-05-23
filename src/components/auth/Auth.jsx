/* eslint-disable */
import React from 'react';
import Login from './Login';
import Registration from './Registration';
import * as io from 'socket.io-client';

export default class Auth extends React.Component {

constructor(props) {
        super(props);
        this.state = {
            activeTab: true
        }
    }
activeTabLogin(){
    this.setState({activeTab: true})
}
activeTabRegister(){
    this.setState({activeTab: false})
}

    render() {
        return (
            <div className="author">
                <span className = {this.state.activeTab?"tabs_active tabs":"tabs"} onClick={this.activeTabLogin.bind(this)}>Login</span>
                 <span className = {!this.state.activeTab?"tabs_active tabs":"tabs"} onClick={this.activeTabRegister.bind(this)}>Registration</span>
                <div className="auth_forms">
                    <Login activeTab={this.state.activeTab}/>
                    <Registration activeTab={this.state.activeTab}/>
                </div>
            </div>
        )
    }
}
