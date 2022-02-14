import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./config";

/*
Amplify will reference Cognito as Auth, S3 as Storage and API Gateway as API.
the mandatory sign in is set to true because users must be logged in before they can interact with the application.
With amplify, we can work with multiple API's but for now we're just setting it to notes via the name: "notes" down in endpoints.
Amplify.configure() is a function created by AWS that allows us to specifically say
which resources we want to interact with via the backend.
*/
Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID,
	},
	Storage: {
		region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
	},
	API: {
		endpoints: [
			{
				name: "notes",
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION,
			},
		],
	},
});

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
