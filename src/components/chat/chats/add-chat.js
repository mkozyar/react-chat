/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {API_CONFIG} from '../../../API.config';

class AddChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desctiption: '',
            avatar: '',
            creator: '',
            users: [],
            chatUsers: [this.props.login],
            select: false
        }
    }

    componentDidMount() {
        fetch(API_CONFIG.USERS)
            .then(response => response.json())
            .then(users => {
                this.setState({ users: users })
            })
    }

    render() {
        return (
            <div className='add_chat_wrap'>
                <form>

                    <input
                        type="text"
                        name="name"
                        id="chatName"
                        placeholder='CHAT NAME'
                        onChange={this.inputValue.bind(this)}
                    /><br />

                    <input
                        type="text"
                        name="description"
                        id="desc"
                        placeholder='DESCRIPTION'
                        onChange={this.inputValue.bind(this)}
                    /><br />


                    {this.state.users.filter(u => u.login !== this.props.login.login).map(user => (
                        <div className="users_list" key={user._id} >
                            <div className = "user_list_item" onClick={(e) => { this.onSelect(e, user) }} >
                                <img src={user.avatar} />
                                {user.login}
                            </div>
                        </div>
                    ))
                    }


                    <input type="submit" value="Create Chat" onClick={this.submit.bind(this)} />

                </form>
                <div className="close">
                    <Link to='/' > <i className="fa fa-times-circle" aria-hidden="true"></i></Link>
                </div>
            </div>
        )
    }

    onSelect(e, user) {

        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            this.state.chatUsers.push(user);
        }
        this.setState(this.state.chatUsers);
    }

    inputValue(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

    }
    submit(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');


        let myInit = {
            method: 'post',
            headers: { myHeaders },
            mode: 'cors',
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                creator: this.props.login.login,
                users: this.state.chatUsers,
                avatar: 'http://www.volynpost.com/img/modules/news/e/1c/fced9d71d3a27fb3bf5751597e4451ce/cb-cv2px3xu5qo.jpg',
            })
        }
        fetch(API_CONFIG.CHATS, myInit)
            .then(() => {
                console.log('Resistration OK!');

            });
    }


}

export default connect(
    state => ({

        login: state.login
    }),
    dispatch => ({
        onCreate: (chat) => {
            dispatch({ type: "CREATE_CHAT", payload: chat });
        }
    })
)(AddChat);
