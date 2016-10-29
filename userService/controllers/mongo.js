import config from '../config.js';
import mongodbURI from 'mongodb-uri';
import mongojs from 'mongojs';

const uri = mongodbURI.format(config.mongodb);

export default class Mongo {
    constructor(db = 'test') {
        this.db = mongojs(`${uri}/${db}`);
        this.db.on('error', err => console.log('mongo database error', err));
        this.db.on('connect', () => console.log('mongo database connected'));
    }

    getOne(collection, query, callback) {
        this.db.collection(collection).findOne(query, (err, doc) => {
            return callback(err ? err : null, err ? null : doc);
        });
    }

    getAll(collection, callback) {
        this.db.collection(collection).find().forEach((err, doc) => {
            if (err) {
                return callback(err);
            } else if (!doc) {
                return callback(null, null);
            } else {
                return callback(null, doc);
            }
        });
    }

    insertOne(collection, document, callback) {
        document._id = document._id ? document._id : new mongojs.ObjectId().toString();
        this.db.collection(collection).insert(document, (err, doc) => {
            return callback(err ? err : null, err ? null : doc);
        });
    }

    updateOne(collection, _id, data, callback) {
        this.db.collection(collection).findAndModify({
            query: {_id},
            update: {$set: data}
        }, (err, doc, lastErrorObject) => {
            return callback(err ? err : null, err ? null : doc, err ? null : lastErrorObject.updatedExisting);
        });
    }

    deleteOne(collection, _id, callback) {
        this.db.collection(collection).remove({_id}, {justOne: true}, (err, doc) => {
            return callback(err ? err : null, err ? null : doc);
        });
    }

    deleteAll(collection, callback) {
        this.db.collection(collection).remove((err, docs) => {
            return callback(err ? err : null, err ? null : docs);
        });
    }
}
