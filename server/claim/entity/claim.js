
export default class Claim {
    constructor(param) {
        this.id = param.id;
        this.name = param.name;
        this.email = param.email;
        this.policyId = param.policyId;
        this.type = param.type;
        this.amount = param.amount;
        this.dateOccured = param.dateOccured;
        this.status = param.status;
    }
};