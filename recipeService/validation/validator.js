import {
  id,
  first,
  last,
  email,
  phone,
  password
} from './rules.js';
import async from 'async';

export default class Validator {
    _createTasks(data) {
        return {
            _id: callback => {
                id(data._id, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            first: callback => {
                first(data.first, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            last: callback => {
                last(data.last, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            email: callback => {
                email(data.email, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            phone: callback => {
                phone(data.phone, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            },
            password: callback => {
                password(data.password, (err, result) => {
                    return callback(err ? err : null, err ? null : result);
                });
            }
        }
    }

    static validateNew(data, callback) {
        let tasks = Validator.prototype._createTasks(data);
        if (!data._id) {
            Reflect.deleteProperty(tasks, '_id');
        }
        async.parallel(tasks, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }

    static validateUpdate(data, callback) {
        let tasks = Validator.prototype._createTasks(data);

        if (data.id) {
            return callback({message: 'cannot modify the id field'});
        }
        Reflect.deleteProperty(tasks, '_id');
        //almost everything is optional when doing an update so only keep the pending validation calls for the paramters that do
        if (!data.first) {
            Reflect.deleteProperty(tasks, 'first');
        }
        if (!data.last) {
            Reflect.deleteProperty(tasks, 'last');
        }
        if (!data.email) {
            Reflect.deleteProperty(tasks, 'email');
        }
        if (!data.phone) {
            Reflect.deleteProperty(tasks, 'phone');
        }
        if (!data.password) {
            Reflect.deleteProperty(tasks, 'password');
        }
        async.parallel(tasks, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }

    static validateLogin(data, callback) {
         let tasks = Validator.prototype._createTasks(data);

        async.parallel({
            email: tasks.email,
            password: tasks.password
        }, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }
}
