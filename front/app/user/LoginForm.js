import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.props.onInputChange(event);
  }

  handleSubmit(event) {
    this.props.onLogin();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h4>Members only area</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Login:
                  </label>
            <input
              className="form-control"
              name="login"
              type="text"
              value={this.props.login}
              onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>
              Password:
                  </label>
            <input
              className="form-control"
              name="password"
              type="password"
              value={this.props.password}
              onChange={this.handleInputChange} />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;