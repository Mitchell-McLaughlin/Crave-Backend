const shallowValidate = (data, callback) => {
    if (data === undefined) {
        return callback(new Error('field is undefined'));
    } else if (data === null) {
        return callback(new Error('field is null'));
    } else if (data.length < 1) {
        return callback(new Error('field does not meet the minimum length requirement'));
    }
    return callback(null, data);
};

export function id(id, callback) {
    return shallowValidate(id, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}

export function name(name, callback) {
    return shallowValidate(name, (err, result) => {
        //add buisness logic here
        return callback(err ? err : null, err ? null : result);
    });
}


