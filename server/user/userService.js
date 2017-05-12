
class UserService {
    constructor() {
        this._users = [{
            id: 123,
            name: "ulf",
            password: "ulf"
        }];
    }

    authenticate(username, password , callback) {
        this._users.forEach((user) => {
            if(user.name === username && user.password === password) {
                callback(user);
                return;
            }
        });
        callback(null);
    }

    findById(id, callback) {
        this._users.forEach((user) => {
            if(user.id === id) {
                callback(null, user);
                return;
            }
        });
        callback(null, null);
    }
};


export default new UserService();

