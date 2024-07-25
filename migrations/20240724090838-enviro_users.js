// migrations/20240724090838-enviro_users.js

const { MongoClient, ObjectId } = require('mongodb');
const { connect, getClient } = require('../src/config/dbconnection');
const path = require('path');
 // Unique identifier for this migration
const filename = path.basename(__filename);

module.exports = {
    async up(db) {
        let client;
        try {
            client = await connect(); // Establish MongoDB connection

            // Check if collection already exists
            console.log("client",client);
            const collections = await db.listCollections({ name: 'test_user' }).toArray();
            if (collections.length > 0) {
                console.log('Collection test_user already exists. Skipping creation.');
                return;
            }

            // Your migration logic goes here
            const schemaOptions = {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['name', 'email'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'must be a string and is required'
                            },
                            email: {
                                bsonType: 'string',
                                description: 'must be a string and match the regular expression pattern'
                            },
                            age: {
                                bsonType: 'int',
                                minimum: 18,
                                maximum: 120,
                                description: 'must be an integer in [18, 120]'
                            },
                            createdAt: {
                                bsonType: 'date',
                                description: 'must be a date and is required'
                            },
                            updatedAt: {
                                bsonType: 'date',
                                description: 'must be a date and is required'
                            }
                        }
                    }
                }
            };

            // Create the collection with validation
            await db.createCollection('test_user', { validator: schemaOptions.validator });

            // Mark migration as applied in migration_versions collection
            await db.collection('migration_versions').insertOne({
                _id: new ObjectId(),
                name: filename,
                appliedAt: new Date()
            });

            console.log(`Migration ${filename} applied successfully.`);
        } catch (err) {
            console.error(`Error applying migration ${filename}:`, err);
            throw err; // Ensure error propagates to the caller
        } finally {
            // Close MongoDB client connection if opened in this function
            if (client) {
                await getClient().close();
            }
        }
    },

    async down(db) {
        let client;
        try {
            client = await connect(); // Establish MongoDB connection

            // Your rollback logic goes here
            await db.collection('test_user').drop();

            // Remove migration record from migration_versions collection on rollback
            await db.collection('migration_versions').deleteOne({ name: filename });

            console.log(`Rollback for migration ${filename} completed successfully.`);
        } catch (err) {
            console.error(`Error rolling back migration ${filename}:`, err);
            throw err; // Ensure error propagates to the caller
        } finally {
            // Close MongoDB client connection if opened in this function
            if (client) {
                await getClient().close();
            }
        }
    }
};
