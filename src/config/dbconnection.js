const { MongoClient } = require('mongodb');

let client;

async function connect() {
    const url='mongodb://localhost:27017/';
    const dbName='lambda';
    if (!client) {
        client = new MongoClient(url, {});
        await client.connect();
    }
    return client.db(dbName);
}

function getClient() {
    return client;
}

module.exports = { connect, getClient };
