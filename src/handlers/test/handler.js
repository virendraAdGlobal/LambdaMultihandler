const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const ses = new AWS.SES();

module.exports.sendSNS = async (event) => {
  const message = event.body; // Assuming the POST body contains the message
  const params = {
    Message: message,
    TopicArn: process.env.SNS_TOPIC_ARN  // Replace with your SNS topic ARN
  };

  try {
    await sns.publish(params).promise();
    return {
      statusCode: 200,
      body: 'Message sent to SNS successfully'
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Error sending message to SNS: ' + err.message
    };
  }
};

module.exports.processSNS = async (event) => {
  const snsMessage = JSON.parse(event.Records[0].Sns.Message);
  
  const params = {
    Destination: {
      ToAddresses: [snsMessage.email]
    },
    Message: {
      Body: {
        Text: {
          Data: snsMessage.body
        }
      },
      Subject: {
        Data: snsMessage.subject
      }
    },
    Source: "care.h@enviro.aglprojects.co.in"  // Replace with your verified SES email
  };
  
  try {
    await ses.sendEmail(params).promise();
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email: ', err);
    throw err;
  }
};
