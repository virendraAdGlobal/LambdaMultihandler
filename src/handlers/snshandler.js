const AWS = require('aws-sdk');
const sns = new AWS.SNS();

module.exports.SENDSNS = async (event) => {
  const message = JSON.stringify(event.body);

  const params = {
    Message: message,
    TopicArn: process.env.TOPIC_ARN,
  };

  try {
    await sns.publish(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('Message published successfully'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify('Failed to publish message'),
    };
  }
};
