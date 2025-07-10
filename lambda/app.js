const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();

exports.lambdaHandler = async (event) => {
  const secretName = process.env.MY_SECRET_NAME;

  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Successfully accessed the secret!",
        secret: data.SecretString
      }),
    };
  } catch (err) {
    console.error("❌ Error fetching secret:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "Failed to access secret"
      }),
    };
  }
};
