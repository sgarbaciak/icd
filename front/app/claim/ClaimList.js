import React, { Component } from 'react';
import client from '../rest/client';

class ClaimList extends React.Component {

    constructor(props) {
        super(props);
        this.onClaimUpdated = this.onClaimUpdated.bind(this);
        this.state = { claims: [] };
    }

    fetchClaims() {
        client({
            method: 'GET',
            path: '/api/claim'
        }).then(response => {
            if(response.status.code === 200) {
                this.setState({ claims: response.entity });
            } else if(response.status.code === 401) {
                //bad credentials
                console.error("bad credentials");
                this.props.handleSessionNotValid();
            }
        });
    }

    componentDidMount() {
        this.fetchClaims();
    }

    onClaimUpdated() {
        this.fetchClaims();
    }

    render() {
        let claims = this.state.claims.map(claim =>
            <Claim key={claim.id} claim={claim} onClaimUpdated={this.onClaimUpdated} onUnauthorized={this.props.handleSessionNotValid} />
        );

        return (
            <div>
                {claims}
            </div>
        )
    }
}

class Claim extends React.Component {
    constructor(props) {
        super(props);
        this.onClaimUpdated = this.onClaimUpdated.bind(this);
        this.onUnauthorized = this.onUnauthorized.bind(this);
    }

    onClaimUpdated() {
        this.props.onClaimUpdated();
    }

    onUnauthorized() {
        this.props.onUnauthorized();
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-block">
                    <ClaimTitle type={this.props.claim.type} status={this.props.claim.status} />
                    <h6 className="card-subtitle mb-2 text-muted">Policy ID: {this.props.claim.policyId} - {this.props.claim.name} ({this.props.claim.email})</h6>
                    <h6 className="card-subtitle mb-2 text-muted"></h6>
                    <p className="card-text">Claim Amount: {this.props.claim.amount} EUR <br />Date Occured: {this.props.claim.dateOccured}</p>
                    {this.props.claim.status === 'new' &&
                        <div className="btn-group float-right" role="group">
                            <AcceptButton claim={this.props.claim} onClaimAccepted={this.onClaimUpdated} onUnauthorized={this.onUnauthorized} />
                            <RejectButton claim={this.props.claim} onClaimRejected={this.onClaimUpdated} onUnauthorized={this.onUnauthorized} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

class ClaimTitle extends React.Component {

    constructor(props) {
        super(props);
        this.types = { 'lostBaggage': 'Lost baggage', 'theft': 'Theft', 'accident': 'Accident', 'illness': 'Illness', 'accident': 'Accident', 'missedFlight': 'Missed flight' };
        this.badges = { 'new': 'badge badge-default', 'accepted': 'badge badge-success', 'rejected': 'badge badge-danger' };
    }

    render() {
        const status = this.props.status;
        const type = this.props.type;
        return (
            <h4 className="card-title">
                {this.types[type]} <span className={this.badges[status]}>{status}</span>
            </h4>
        )
    }
}

class AcceptButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(claim) {
        claim.status = 'accepted';
        client({
            method: 'PUT',
            path: '/api/claim/' + claim.id,
            entity: claim,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status.code === 200) {
                this.props.onClaimAccepted();
            } else if(response.status.code === 401) {
                //bad credentials
                console.error("bad credentials");
                this.props.onUnauthorized();
            }
        });
    }

    render() {
        const claim = this.props.claim;
        return (
            <button

                className="btn btn-success"
                value={claim.id}
                onClick={() => this.handleClick(claim)}>
                Accept
            </button>
        );
    }
}

class RejectButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(claim) {
        claim.status = 'rejected'
        client({
            method: 'PUT',
            path: '/api/claim/' + claim.id,
            entity: claim,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status.code === 200) {
                this.props.onClaimRejected();
            } else if(response.status.code === 401) {
                //bad credentials
                console.error("bad credentials");
                this.props.onUnauthorized();
            }
        });
    }

    render() {
        const claim = this.props.claim;
        return (
            <button
                className="btn btn-danger"
                value={claim.id}
                onClick={() => this.handleClick(claim)}>
                Reject
            </button>
        );
    }
}

export default ClaimList;