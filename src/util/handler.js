export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            console.error(e);
            body = { error: e.message };
            statusCode = 500;
        }

        return {
            statusCode,
            body: JSON.stringify(body),
            // here we are adding in the default CORS headers to allow for HTTP requests to the back-end server API
            // Note that this does not enable CORS for the S3 bucket as that is handled separately.
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
        };
    };
}