const AWS = require("aws-sdk");

exports.lambdaHandler = async (event) => {
  const secretName = process.env.SECRET_NAME;
  const region = process.env.AWS_REGION;
  const client = new AWS.SecretsManager({ region });

  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ secret: data.SecretString || "Binary secret" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
