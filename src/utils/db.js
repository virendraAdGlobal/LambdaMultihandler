const mongoose = require('mongoose');
let cachedConnections = {};

async function connectToDatabase(uri, dbName) {
    //console.log("cachedConnections", cachedConnections[dbName]);
    if (cachedConnections[dbName]) {
        return cachedConnections[dbName];
    }

    const connection = await mongoose.createConnection(uri, {}).asPromise();
    cachedConnections[dbName] = connection;
    return connection;
}

module.exports = {
    connectToDatabase,
};


