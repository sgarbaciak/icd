import uuid from 'uuid-js';
import Claim from './entity/claim';

class ClaimService {
    constructor() {
        let _self = this;
        this.repository = {
            _store:  new Map(),
            create: (params) => {
                const id = uuid.create();
                params.id = id.hex;
                _self.repository._store.set(id.hex, new Claim(params));
            },
            update: (claim) => {
                _self.repository._store.set(claim.id, claim);
            },
            list: () => {
                return Array.from(_self.repository._store, (entry) => {
                    return entry[1];
                });
            },
            get: (id) => {
                return _self.repository._store.get(id);
            }
        }
    }

    list() {
        return this.repository.list();
    }

    update(claim, callback) {
        this.repository.update(claim);
        if(callback) callback();
    }

    create(param, callback) {        
        this.repository.create(param);
        if(callback) callback();
    }

    get(id) {
        return this.repository.get(id);
    }


}

const claimService = new ClaimService();

//bootstrap
claimService.create({
    name: "Max Mustermann",
    email: "max@mustermann.de",
    policyId: 235423,
    type: 'lostBaggage',
    amount: 2,
    dateOccured:  '2017-05-06',
    status: 'new'
});

claimService.create({
    name: "Gerhard Mustermann",
    email: "gerhard@mustermann.de",
    policyId: 2353423,
    type: 'theft',
    amount: 244,
    dateOccured:  '2017-05-06',
    status: 'accepted'
});


export default claimService;


