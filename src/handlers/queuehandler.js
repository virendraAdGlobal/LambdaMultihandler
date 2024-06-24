// src/handlers/queuehandler.js

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

// Handler to send a message to the SQS queue
module.exports.sendMessage = async (event) => {
  const queueUrl = process.env.SQS_QUEUE_URL;
  console.log("queueUrl",queueUrl)
  const body = JSON.parse(event.body);

  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(body)
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully', messageId: result.MessageId })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send message', error })
    };
  }
};

// Handler to receive and process messages from the SQS queue
module.exports.receiveMessage = async (event) => {
  for (const record of event.Records) {
    const messageBody = JSON.parse(record.body);
    console.log('Received message:', messageBody);

    // Process the message
    // Your message processing logic here

  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Messages processed successfully' })
  };
};
