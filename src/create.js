import * as uuid from "uuid";
import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

// NOTE THE COMMAND LINE IN WINDOWS IS ABSOLUTELY DUMB! WHEN PASSING IN THE JSON DATA
// FOR THE CURL POST COMMAND YOU HAVE TO USE \ TO ENSURE DOUBLE QUOTES ARE BROKEN OUT OF!
// SO DUMB BUT NOW IT ALL WORKS!
export const main = handler(async (event) => {
    
    const data = JSON.parse(event.body);
    
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // Previously used a constant Id to test functionality of API
            // Now using the identity ID created with Cognito
            // userId: "123",
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };
    
    await dynamoDb.put(params);

    return params.Item;
});