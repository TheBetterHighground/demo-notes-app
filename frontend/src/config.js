const config = {
	STRIPE_KEY:
		"pk_test_51KRJP9HNQ7UcFmEQGkm9KilONbdGmGsWmRfImzuoXUMGbFLwlyI9XJIE4DKcAQ6ZpSnEQYmDMaaTPzQ1k8DiShwN00OorHDkxv",
	MAX_ATTACHMENT_SIZE: 5000000,
	s3: {
		REGION: process.env.REACT_APP_REGION,
		BUCKET: process.env.REACT_APP_BUCKET,
	},
	apiGateway: {
		REGION: process.env.REACT_APP_REGION,
		URL: process.env.REACT_APP_API_URL,
	},
	cognito: {
		REGION: process.env.REACT_APP_REGION,
		USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
		APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
		IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
	},
};

export default config;
// the above code will load the environment that's set up from the serverless backend
// It will export a configuration JSON that provides the necessary data for any processes that
// will be executed via the frontend.
