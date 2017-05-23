/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            wrong: false,
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3012/users')
            .then(response => response.json())
            .then(users => {
                this.setState({ users: users })
            })
    }

    wrongHide() {
        this.setState({ wrong: false })
    }

    render() {
        return (
            <div className={this.props.activeTab ? "login_form" : "hide"}>
                <div className={this.state.wrong ? 'wrong' : 'hide'}>Wrong login or password!</div>
                <form action="" name="login_form">
                    <label htmlFor="login">Enter your login</label><br />

                    <input
                        type="text"
                        name="login"
                        id="login"
                        value={this.state.login}
                        onChange={this.onChangeLogin.bind(this)}
                        onFocus={this.wrongHide.bind(this)} /><br />

                    <label htmlFor="pass">Enter your password</label><br />

                    <input
                        type="password"
                        name="pas"
                        id="pass"
                        value={this.state.password}
                        onChange={this.onChangePassword.bind(this)}
                        onFocus={this.wrongHide.bind(this)} /><br />

                    <input
                        type="submit"
                        value="Login"
                        onClick={this.onSubmit.bind(this)} />

                </form>
                <a href="#">Forgot your password?</a>
            </div>
        )
    }

    onChangeLogin(e) {
        this.setState({ login: e.target.value })
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();
      
        if (this.validateLogin(this.state.users, { login: this.state.login, password: this.state.password })) {
            let myHeaders = new Headers();
            myHeaders.set('Content-Type', 'application/json');

            let myInit = {
                method: 'post',
                headers: myHeaders,
                mode: 'cors',
                body: JSON.stringify({ login: this.state.login, password: this.state.password })
            }
            fetch('http://localhost:3012/login', myInit)
                .then((res) => res.json())
                .then((data) => {
                    this.initSocket(data.token);
                    this.isLogin(data.user);
                })
        } else this.setState({ wrong: true })
        
    }

    validateLogin(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i].login === obj.login) && (arr[i].password === obj.password)) {
                return true
            }
            else {
                return false
            }
        }
    }


    initSocket(JWT) {
        window.socket = io.connect('http://localhost:3012');
        window.socket.on('connect', () => {
            window.socket.emit('authenticate', { token: JWT });
        })
    }
    componentDidUpdate() {

        var a = localStorage.getItem('login-user');
        this.props.onLogin(JSON.parse(a));

    }

    isLogin(s) {
        this.props.onLogin(s);
        if (localStorage.getItem('login-user') !== null) {
            localStorage.setItem('login-user', JSON.stringify(s));

        }

    }

}


export default connect(
    state => ({
        login: state.login
    }),
    dispatch => ({
        onLogin: (l) => {
            dispatch({ type: "LOGIN", payload: l });
        }

    })
)(Login);

