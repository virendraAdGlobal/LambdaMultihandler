const { MongoClient } = require('mongodb');
const { connect, getClient } = require('../src/config/dbconnection');
const path = require('path');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
    

async function seedUsers() {
    try {
        const db = await connect(); 
        
        const filename = path.basename(__filename);
        // Define your collection and initial data
        const collection = db.collection('enviro_users'); 
        const existingDocuments = await collection.find().toArray();
        if (existingDocuments.length > 0) {
            console.log('Data already seeded. Skipping '+filename+'.');
            return;
        }
        const hashedPassword = await bcrypt.hash('AGL00001', saltRounds);
        const initialData = [
            { full_name: 'virendra Singh', email: 'virendra.badgurjar@adglobal360.com', created_by:1,role_id:1,employee_code:'AGL2809', salutation: 'Mr.', first_name:"virendra",last_name:'singh',phone_code:"+91",phone_number:"9772117451",gender:"Male",password:hashedPassword,status:"Active", createdAt: new Date(), updatedAt: new Date() },
            // { name: 'Jane Smith', email: 'jane.smith@example.com', age: 25, createdAt: new Date(), updatedAt: new Date() }
            // Add more objects as needed
        ];
        console.log("initialData",initialData)
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
