/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sha1 from 'sha1';
import superagent from 'superagent';
import Dropzone from 'react-dropzone';
import {API_CONFIG} from '../../../API.config';

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disEmail: true,
            disDesc: true,
            disAvatar: true,
            avatar: this.props.login.avatar,
            email: this.props.login.email,
            description: this.props.login.description,


        }
    }
    changeEmail() {
        this.setState({ disEmail: !this.state.disEmail });
    }
    changeDesc() {
        this.setState({ disDesc: !this.state.disDesc });
    }
    changeAvatar() {
        this.setState({ disAvatar: !this.state.disAvatar });
    }

    inputValue(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });

    }

    uploadFile(files) {
        const image = files[0]

        const cloudName = 'dghzpbean'
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'

        const timestamp = Date.now() / 1000
        const uploadPreset = 'tjwfwf2n'

        const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'K0FzhcOSzXbODmiLOx6DS6gTD3g'

        const signature = sha1(paramsStr)
        const params = {
            'api_key': '247132395473576',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        let uploadRequest = superagent.post(url)
        uploadRequest.attach('file', image)

        Object.keys(params).forEach((key) => {
            uploadRequest.field(key, params[key])
        })

        uploadRequest.end((err, res) => {
            if (err) {
                alert(err)
                return
            }
            this.setState({ avatar: res.body.secure_url })
        })
    }

    updateUserInfo() {
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');

        let myInit = {
            method: 'put',
            headers: { myHeaders },
            mode: 'cors',
            body: JSON.stringify({
                avatar: this.state.avatar,
                email: this.state.email,
                description: this.state.description
            })
        }
        fetch(`API_CONFIG.USERS/${this.props.login.login}`, myInit)

            .then(fetch(API_CONFIG.USERS)
                .then(response => response.json())
                .then(user => {
                    localStorage.setItem('login-user', JSON.stringify(user.filter(u => u.login === this.props.login.login)[0]));
                    this.changeLoginProps(user.filter(u => u.login === this.props.login.login)[0]);
                })



            )
    }

     componentDidMount(){
         
        var a =localStorage.getItem('login-user');
        this.props.onLogin(JSON.parse(a));
      
     }

    changeLoginProps(s) {
        this.props.onLogin(s);
    }

    render() {

        return (
            <div className="user_info_wrap">
                <form name="userInfo">
                    <img src={this.state.avatar} />
                    <div><input type='email' placeholder={this.props.login.email} name="email" onChange={this.inputValue.bind(this)} disabled={this.state.disEmail} />
                        <i className="fa fa-pencil" className={!this.state.disEmail ? "hide" : "fa fa-pencil"} aria-hidden="true" onClick={this.changeEmail.bind(this)}  ></i>
                        <i className="fa fa-check" className={this.state.disEmail ? "hide" : "fa fa-check"} onMouseDown={this.updateUserInfo.bind(this)} onClick={this.updateUserInfo.bind(this)} onMouseUp={this.changeEmail.bind(this)} aria-hidden="true"></i>

                    </div>
                    <div>
                        <input type='text' placeholder={this.props.login.description} onChange={this.inputValue.bind(this)} name="description" disabled={this.state.disDesc} />
                        <i className="fa fa-pencil" className={!this.state.disDesc ? "hide" : "fa fa-pencil"} aria-hidden="true" onClick={this.changeDesc.bind(this)}></i>
                        <i className="fa fa-check" className={this.state.disDesc ? "hide" : "fa fa-check"} onMouseDown={this.updateUserInfo.bind(this)}onClick={this.updateUserInfo.bind(this)} onMouseUp={this.changeDesc.bind(this)} aria-hidden="true"></i>
                    </div>
                    <div>

                        <input type="button" value='Upload image' disabled={this.state.disAvatar} />
                        <i className="fa fa-pencil" className={!this.state.disAvatar ? "hide" : "fa fa-pencil"} aria-hidden="true" onClick={this.changeAvatar.bind(this)}></i>
                        <i className="fa fa-check" className={this.state.disAvatar ? "hide" : "fa fa-check"} onMouseDown={this.updateUserInfo.bind(this)} onClick={this.updateUserInfo.bind(this)} onMouseUp={this.changeAvatar.bind(this)} aria-hidden="true"></i>
                    </div>
                    <div className={this.state.disAvatar ? "hide" : "dropzone"}>
                        <Dropzone onDrop={this.uploadFile.bind(this)} disabled={this.state.disAvatar} />
                    </div>
                    <div className="close">
                        <Link to='/' > <i className="fa fa-times-circle" aria-hidden="true"></i></Link>
                    </div>
                </form>
            </div>
        )
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
)(UserInfo);
