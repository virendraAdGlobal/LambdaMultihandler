const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.seshandler = async (event) => {
  console.log('Received SNS event:', JSON.stringify(event, null, 2));

  const message = event.Records[0].Sns.Message;
  console.log('SNS message:', message);

  const params = {
    Destination: {
      ToAddresses: ['virendra.badgurjar@adglobal360.com']  // Replace with your recipient email address
    },
    Message: {
      Body: {
        Text: { Data: 'This is the email body.' }
      },
      Subject: { Data: 'Email subject' }
    },
    Source: 'care.h@enviro.aglprojects.co.in'  // Replace with your verified sender email address in SES
  };

  try {
    await ses.sendEmail(params).promise();
    console.log('Email sent successfully.');
    return {
        statusCode: 200,
        body: JSON.stringify('Email sent successfully.')
      };
  } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify(error)
      };
    // console.error('Error sending email:', error);
    // throw error;
  }

 
};
