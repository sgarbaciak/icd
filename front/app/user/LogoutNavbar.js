import React, { Component } from 'react';

class LogoutNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onLogout(event);
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-faded">
                <h1 className="navbar-brand mb-0">Claims Dashboard
                    <div className="float-right">
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={this.handleClick}>
                            Logout
                        </button>
                    </div>
                </h1>
            </nav>
        )
    }
}

export default LogoutNavbar;