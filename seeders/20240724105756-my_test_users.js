const { MongoClient } = require('mongodb');
const { connect, getClient } = require('../src/config/dbconnection');
const path = require('path');

async function seedUsers() {
    try {
        const db = await connect(); 
        
        const filename = path.basename(__filename);
        // Define your collection and initial data
        const collection = db.collection('test_user'); 
        const existingDocuments = await collection.find().toArray();
        if (existingDocuments.length > 0) {
            console.log('Data already seeded. Skipping '+filename+'.');
            return;
        }
        const initialData = [
            { name: 'John Doe', email: 'john.doe@example.com', age: 30 },
            { name: 'Jane Smith', email: 'jane.smith@example.com', age: 25 }
            // Add more objects as needed
        ];
        // Insert initial data into the collection
        await collection.insertMany(initialData);
        console.log('Data seeded of'+filename+' successfully.');

        // Close the MongoDB client connection
        await getClient().close();
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

module.exports = seedUsers;
