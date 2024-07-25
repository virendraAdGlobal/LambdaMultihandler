const jwt = require('jsonwebtoken');
exports.authFunction = async (event) => {
    try {
      const token = event.headers.Authorization;
      //console.log("token","eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc")
      //console.log("process.env.JWT_SECRET","eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc")
      const decoded = await jwt.verify(token, "eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc");
      console.log("decoded",decoded)

      return {
        principalId:decoded?.username, // Required
        policyDocument: {
        Statement: [
            {
              Action: 'execute-api:Invoke', // Allowed action
              Effect: 'Allow', // Allow or Deny
              Resource: event.methodArn // API Gateway ARN
            }
          ]
        }
      };
    } catch (error) {
      return {
        principalId: 'user|unauthorized', // Required, even for errors
        policyDocument: {
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Deny',
              Resource: event.methodArn
            }
          ]
        }
      };
    }
  };