/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {API_CONFIG} from '../../../API.config';

class ChatInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            users: [],

        }
    }

    componentWillMount() {
        fetch('API_CONFIG.USERS')
            .then(response => response.json())
            .then(users => {
                this.setState({ users: this.props.selectedChat.users })
            })
    }

    render() {
        return (
            <div className="users_wrap">
                {this.state.users.map(user => (

                    <div className="user_list_item" key={user._id} onClick={(e) => { this.onSelect(e, user) }} >
                        <img src={user.avatar} />
                        {user.login}
                        <div className="status">
                        </div>
                    </div>

                ))
                }
                <div className="close">
                    <Link to='/' > <i className="fa fa-times-circle" aria-hidden="true"></i></Link>
                </div>
            </div>
        )
    }


}

export default connect(
    state => ({
        selectedChat: state.selectChat,
        login: state.login
    }),
    dispatch => ({
        onCreate: (chat) => {
            dispatch({ type: "CREATE_CHAT", payload: chat });
        }
    })
)(ChatInfo);
