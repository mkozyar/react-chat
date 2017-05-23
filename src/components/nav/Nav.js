import React from 'react';
import { Link } from 'react-router-dom';


export default class Nav extends React.Component {



    render() {
        return (
            <div className="nav">
                <ul>
                    <li><Link to='home' >Home</Link></li>
                    <li><Link to='chat' >Chat</Link></li>
                    <li><Link to='auth' >Login</Link></li>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}