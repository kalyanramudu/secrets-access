const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

exports.lambdaHandler = async (event) => {
    const secretArn = process.env.SECRET_ARN;

    const client = new SecretsManagerClient({});
    const command = new GetSecretValueCommand({ SecretId: secretArn });

    try {
        const data = await client.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Successfully retrieved secret!",
                secret: data.SecretString,
            }),
        };
    } catch (error) {
        console.error("Error retrieving secret:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to retrieve secret", error: error.message }),
        };
    }
};
