// handler.js

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { connect, getClient } = require('../config/dbconnection'); // Adjust as per your MongoDB connection logic

async function runMigrations() {
    try {
        const db = await connect(); // Connect to MongoDB

        // Get list of migration scripts in the 'migrations' directory
        const migrationDir = path.join(__dirname, '../../migrations');
        const files = fs.readdirSync(migrationDir).sort(); // Sort by filename for sequential execution

        // Iterate over each migration script
        for (const file of files) {
            if (file.endsWith('.js')) {
                const migrationPath = path.join(migrationDir, file);
                console.log("migrationPath",migrationPath);
                const migrationScript = require(migrationPath);

                 console.log(`Running migration: ${file}`);
                 await migrationScript.up(db); // Pass db connection to migration script
                // console.log(`Migration completed: ${file}`);
            }
        }

        console.log('All migrations completed successfully.');

        // Close MongoDB client connection
        await getClient().close();
    } catch (err) {
        console.error('Error running migrations:', err);
        throw err; // Ensure error propagates to the caller (Serverless Framework)
    }
}

// Export the handler function for serverless framework
module.exports.runMigrations = async (event) => {
    try {
        console.log('Starting migrations...');

        await runMigrations();

        console.log('All migrations finished.');

        return { statusCode: 200, body: 'All migrations finished.' };
    } catch (err) {
        console.error('Error running migrations:', err);
        return { statusCode: 500, body: 'Error running migrations.' };
    }
};
