import * as iam from "aws-cdk-lib/aws-iam";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
    // public reference to the auth instance
    auth;

    constructor(scope, id, props) {
        super(scope, id, props);

        const { api, bucket } = props;

        // Create a Cognito User Pool and Identity Pool
        this.auth = new sst.Auth(this, "Auth", {
            cognito: {
                userPool: {
                    // Users can login with their email and password
                    signInAliases: { email: true },
                },
            },
        });

        this.auth.attachPermissionsForAuthUsers([
            // Allow acces to the API
            api,
            // Policy granting access to specific folder in the bucket
            new iam.PolicyStatement({
                actions: ["s3:*"],
                effect: iam.Effect.ALLOW,
                resources: [
                    bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
                ],
            }),
        ]);

        // Show the auth resources in the output
        this.addOutputs({
            Region: scope.region,
            UserPoolId: this.auth.cognitoUserPool.userPoolId,
            IdentityPoolId: this.auth.cognitoCfnIdentityPool.ref,
            UserPoolClientId: this.auth.cognitoUserPoolClient.userPoolClientId,
        });
    }
}

// create a new stack for the auth infrastructure
// Its entirely not necessary but allows me to exemplify how to work with multiple stacks.
// The Auth construct creates a cognito user pool. The signInAlisases prop states that we want
// users to login with their email.
// The Auth also constructs an Identity Pool. The attachPermissionsForAuthUsers function allows us to specify the resources our authenticated users have access to.
// Here they have access to the API and the S3 bucket. Finally, we output the ids of the auth resources that've been created.