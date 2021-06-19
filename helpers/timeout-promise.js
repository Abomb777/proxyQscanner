const promiseTimeout = (ms, callback)=> {
    return new Promise(function(resolve, reject) {
        callback(resolve, reject);

        setTimeout(function() {
            resolve(false);
        }, ms);
    });
};

module.exports=promiseTimeout;