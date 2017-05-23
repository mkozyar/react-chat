/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

class Logout extends React.Component {
    render() {
        return (
            <div>
                <div className = "logout">
                   <div className ="user_info"> {this.props.login.login}</div>
                    <i className="fa fa-sign-out" aria-hidden="true" title = "Logout" onClick = {this.logout.bind(this)}></i>
                </div>
            </div>
        )
    }

    logout(){
        this.props.onLogout();
        localStorage.setItem('login-user', '');
        

    }
}
export default connect(
    state => ({
        login: state.login
    }),
    dispatch => ({
        onLogout: (l) => {
            dispatch({ type: "LOGOUT", payload: l});
        }
    })
)(Logout);

