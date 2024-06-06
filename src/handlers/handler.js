 'use strict';
const {modelName,connecthChatSchema} = require('../models/user');
const {connectToDatabase} =require('../utils/db');
const {getModel} =require('../utils/getmodel');

// Cache connections and models
exports.hello = async () => {
  try {
       
    // Ensure the database URI is provided
    if (!dbUri) {
      throw new Error(`Database URI for ${dbName} is not defined`);
    }

    // Connect to the database
    const connection = await connectToDatabase(dbUri1, dbName1);

    // Get or create the model for the connection
    const User = getModel(connection, modelName, connecthChatSchema);

    // Example operation
    const result = await User.find({});

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    //console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }), 
    };
  }
};

