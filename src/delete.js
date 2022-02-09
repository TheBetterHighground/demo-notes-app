import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            // Replacing userId with Cognito created Identity ID
            // userId: "123",
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identiyId,
            noteId: event.pathParameters.id
        }
    };
    // const params = {};
    // var hashKey = { userId: "123", nodeId: event.pathParameters.id.toString() };

    // params.TableName = process.env.TABLE_NAME;
    // params.Key = hashKey;
    await dynamoDb.delete(params);

    return { status: true };
});