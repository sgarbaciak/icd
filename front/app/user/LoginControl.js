import React, { Component } from 'react';
import ClaimForm from '../claim/ClaimForm';
import ClaimList from '../claim/ClaimList';
import LoginForm from './LoginForm';
import LogoutNavbar from './LogoutNavbar';
import client from "../rest/client";

class LoginControl extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSessionNotValid = this.handleSessionNotValid.bind(this);
        var logInState = localStorage.getItem('isLoggedIn') === "loggedin";
        this.state = { login: '', password: '', isLoggedIn: logInState, loginFailed: false };
    }

    setLogOut() {
        localStorage.setItem('isLoggedIn', "loggedout");
        this.setState({isLoggedIn: false, login: '', password: '', loginFailed: false});
    }

    setLogIn() {
        localStorage.setItem('isLoggedIn', "loggedin");
        this.setState({ isLoggedIn: true, loginFailed: false});
    }

    handleSessionNotValid() {
        console.error("session not valid");
        this.setLogOut();
    }

    handleLoginClick() {
        client({
            method: 'POST',
            path: '/api/users',
            entity: this.state,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            const _self = this;
            if(res.status.code === 200) {
                _self.setLogIn();
                _self.setState({ loginFailed: false });
            } else if(res.status.code === 401) {
                //bad credentials
                console.error("bad credentials");
                this.setState({ loginFailed: true });
            }
        });
    }

    handleLogoutClick() {
        const _self = this;
        client({
            method: 'GET',
            path: '/api/users/logout',
            entity: this.state,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            _self.setLogOut();
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let site = null;
        if (isLoggedIn) {
            site =
                <div>
                    <LogoutNavbar onLogout={this.handleLogoutClick} />
                    <div className='container'>
                        <br />
                        <ClaimList handleSessionNotValid={this.handleSessionNotValid} />
                    </div>
                </div>
        } else {
            site =
                <div className='container'>
                    <div className="row">
                        <div className="col">
                            <ClaimForm />
                        </div>
                        <div className="col-3">
                            <LoginForm login={this.state.login} password={this.state.password} onInputChange={this.handleInputChange} onLogin={this.handleLoginClick} />
                            <br />
                            {this.state.loginFailed &&
                            <div className="alert alert-danger" role="alert">
                                Username or password are wrong!
                            </div>
                            }
                        </div>
                    </div>
                </div>
        }


        return (
            <div>
                {site}
            </div>
        );
    }
}

export default LoginControl;