const { MongoClient } = require('mongodb');
const { connect, getClient } = require('../src/config/dbconnection');

module.exports = {
    async up() {
        const db = await connect();
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
                      }
                  }
              }
          }
      };
        // Example: Create a new collection
        await db.createCollection('test_user',{ validator: schemaOptions.validator });

        await getClient().close();
    },

    async down() {
        const db = await connect();
        
        // Example: Drop the new collection
        await db.collection('test_user').drop();

        await getClient().close();
    }
};


