const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({ region: 'ap-south-1' });

async function getSecretValue(secretName) {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
      return JSON.parse(data.SecretString);
    } else {
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('ascii'));
    }
  } catch (err) {
    console.error(`Error fetching secret ${secretName}:`, err);
    throw err;
  }
}

async function getConfig() {
  const stage = process.env.STAGE || 'dev';
  const secretName = `${stage}/myapp/mongo`;
  console.log("secretName",secretName);
  return await getSecretValue(secretName);
}

module.exports = getConfig;
