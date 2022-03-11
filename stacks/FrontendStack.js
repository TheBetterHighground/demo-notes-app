import * as sst from "@serverless-stack/resources";

export default class FrontendStack extends sst.Stack {
	constructor(scope, id, props) {
		super(scope, id, props);

		const { api, auth, bucket } = props;

		// Define the React app
		const site = new sst.ReactStaticSite(this, "ReactSite", {
			customDomain:
				scope.stage === "prod"
					? {
							domainName: "apollo-notes.net",
							domainAlias: "www.apollo-notes.net",
					  }
					: undefined,
			path: "frontend",
			// pass in environment variables
			environment: {
				REACT_APP_API_URL: api.customDomainUrl || api.url,
				REACT_APP_REGION: scope.region,
				REACT_APP_BUCKET: bucket.bucketName,
				REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
				REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
				REACT_APP_USER_POOL_CLIENT_ID:
					auth.cognitoUserPoolClient.userPoolClientId,
			},
		});

		// show the url in the output
		this.addOutputs({
			SiteUrl: site.customDomainUrl || site.url,
		});
	}
}

// The above code constructs a stack that allows us to connect the front end and the back end.
// All stacks and functions could have been handled in a single stack file. However,
// doing so would detract from properly demonstrating how these stacks work individually as building blocks.
