import {
  id,
  name
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
            name: callback => {
                first(data.name, (err, result) => {
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
        if (!data.name) {
            Reflect.deleteProperty(tasks, 'name');
        }
        async.parallel(tasks, (err, result) => {
            return callback(err ? err : null, err ? null : result);
        });
    }
}
