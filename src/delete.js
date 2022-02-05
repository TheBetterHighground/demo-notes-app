import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
    
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            userId: "123",
            noteId: event.pathParameters.id,
        },
    };
    // const params = {};
    // var hashKey = { userId: "123", nodeId: event.pathParameters.id.toString() };

    // params.TableName = process.env.TABLE_NAME;
    // params.Key = hashKey;
    await dynamoDb.delete(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });

    return { status: true };
});