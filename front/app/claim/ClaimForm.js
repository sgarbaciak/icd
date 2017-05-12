import React, { Component } from 'react';
import client from '../rest/client';

class ClaimForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            policyId: '',
            type: 'lostBaggage',
            amount: '',
            dateOccured: '', 
            added: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const claim = this.state;
        claim.status = "new";
        client({
            method: 'POST',
            path: '/api/claim',
            entity: claim,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({
                name: '',
                email: '',
                policyId: '',
                type: 'lostBaggage',
                amount: '',
                dateOccured: '',
                added: true
            });
        });
    }

    render() {
        return (
            <div>
                <h4>Report claim</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label >Name:</label>
                        <input
                            id="name"
                            className="form-control"
                            name="name"
                            type="text"
                            required
                            value={this.state.name}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            id="email"
                            className="form-control"
                            name="email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Policy ID:</label>
                        <input
                            id="policyId"
                            className="form-control"
                            name="policyId"
                            type="text"
                            required
                            value={this.state.policyId}
                            onChange={this.handleInputChange} />
                    </div>
                    <ClaimTypeSelect name="type" claimType={this.state.type} onClaimTypeChange={this.handleInputChange} />
                    <div className="form-group">
                        <label>Claim amount:</label>
                        <input
                            id="amount"
                            className="form-control"
                            name="amount"
                            type="number"
                            min="0"
                            required
                            value={this.state.amount}
                            onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Date occured:</label>
                        <input
                            id="dateOccured"
                            className="form-control"
                            name="dateOccured"
                            type="date"
                            required
                            value={this.state.dateOccured}
                            onChange={this.handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br/>
                {this.state.added &&
                    <div className="alert alert-success" role="alert">
                        Claim saved!
                    </div>
                }
            </div>
        );
    }
}

class ClaimTypeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onClaimTypeChange(event);
    }

    render() {
        const claimType = this.props.claimType;
        const name = this.props.name;
        return (
            <div className="form-group">
                <label>
                    Claim Type:
            </label>
                <select
                    className="form-control"
                    id="type"
                    name={name}
                    required
                    value={claimType}
                    onChange={this.handleChange}>
                    <option value="lostBaggage">Lost baggage</option>
                    <option value="theft">Theft</option>
                    <option value="missedFlight">Missed flight</option>
                    <option value="illness">Illness</option>
                    <option value="accident">Accident</option>
                </select>
            </div>
        )
    }
}

export default ClaimForm;