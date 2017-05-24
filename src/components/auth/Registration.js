/* eslint-disable */
import React from 'react';
import {API_CONFIG} from '../../API.config';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            passwordConfirm: '',
            avatar: 'http://www.volynpost.com/img/modules/news/e/1c/fced9d71d3a27fb3bf5751597e4451ce/cb-cv2px3xu5qo.jpg',
            users: [],
            loginExist: false,
            eqPass: true
        }
    }

    componentDidMount() {
        fetch('API_CONFIG.USERS')
            .then(response => response.json())
            .then(users => {
                this.setState({ users: users })
            })

    }

    render() {
        return (
            <div className={this.props.activeTab ? "hide" : "sign_form"}>
                <form action="" method = 'GET' name="sign_form">
                    <label htmlFor="login">Enter your name</label><br />
                    <input
                        type="text"
                        name="login"
                        id="login"
                        required='required'
                        value={this.state.login}
                        onChange={this.inputValue.bind(this)}
                        onFocus={this.wrongHide.bind(this)}
                    /> <div className={this.state.loginExist ? 'wrong' : 'hide'}>Login is already exists</div> <br />

                    <label htmlFor="email">Enter your Email</label><br />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.inputValue.bind(this)} /><br />

                    <label htmlFor="naw_pass">Enter your password</label><br />

                    <input
                        type="password"
                        name="password"
                        required='required'
                        id="password"
                        value={this.state.password}
                        onChange={this.inputValue.bind(this)}
                        onFocus={this.wrongPassHide.bind(this)} /><br />

                    <label htmlFor="confirm_pass">Confirm your password</label><br />

                    <input
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        value={this.state.passwordConfirm}
                        onChange={this.inputValue.bind(this)}
                        onFocus={this.wrongPassHide.bind(this)} /><br />
                    <div className={this.state.eqPass ? 'hide' : 'wrong'}>Passwords are not equal</div>

                    <input type="submit" value="Submit" onClick={this.onRegister.bind(this)} />
                </form>
            </div>
        )
    }

    isLoginExist(arr, inputLogin) {
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i].login === inputLogin)) {
                return false
            }
            else
                return true

        }
    }

    wrongHide() {
        this.setState({ loginExist: false })
    }
    wrongPassHide() {
        this.setState({ eqPass: true })
    }

    inputValue(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    equalPasswords(p, cP) {
        if (p === cP) {
            return true
        } else
            return false
    }


    onRegister(e) {
        e.preventDefault();
        if ((this.state.login !== '') && (this.state.password !== '')) {
            if (this.isLoginExist(this.state.users, this.state.login)) {
                if (this.equalPasswords(this.state.password, this.state.passwordConfirm)) {
                    let myHeaders = new Headers();
                    myHeaders.set('Content-Type', 'application/json');


                    let myInit = {
                        method: 'post',
                        headers: { myHeaders },
                        mode: 'cors',
                        body: JSON.stringify({
                            login: this.state.login,
                            email: this.state.email,
                            password: this.state.password,
                            avatar: this.state.avatar
                        })
                    }
                    fetch('API_CONFIG.REGISTER', myInit)
                        .then(() => {
                            console.log('Resistration OK!');

                        });
                } else this.setState({ eqPass: false })
            } else this.setState({ loginExist: true })
        } else alert('fill in all fields')
    }

}
