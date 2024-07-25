 const getConfig = require('../config/aws-credential-manager');
 const fs = require('graceful-fs');

// Your code that uses fs operations

 exports.configsecretmanager = async () => {
  try {
    const config = await getConfig();
   //const secretValue = config.MY_SECRET; // Access your secret value
    // Your handler logic using secretValue
    console.log("virendra","singh")
    //const config={}
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello World', config }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};