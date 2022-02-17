import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import "./App.css";
import { useHistory } from "react-router-dom";

function App() {
	const history = useHistory();
	// we set the variable to true because when the app is first loaded, it starts by checking the current authentication state. Which means it will ignore these variables and utilize the above state variable.
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	// saving login state using useState hook but initializing to false in the beginning.
	const [isAuthenticated, userHasAuthenticated] = useState(false);

	// Declare the use of the Hook useEffect
	// This function is called everytime the component is rendered.
	// The array of variables tell React to re-rerun the function if the array of variables that are passed in are changed.
	// Consequences of building like this,
	// 1 - if an array of variables isn't passed in then the hook is executed everytime the component is rendered.
	// 2 - if we pass in some variables on every render, React will first check if those variables have changed before running the function.
	// 3 - If we pass an empty list of variables then it'll only run our function on the FIRST render.
	useEffect(() => {
		onLoad();
	}, []);

	async function onLoad() {
		try {
			// call the current session method that will retrieve the state variable information for cookies or local storage, if it doesn't execute then the user will not be authenticated.
			await Auth.currentSession();
			userHasAuthenticated(true);
		} catch (e) {
			if (e !== "No current user") {
				alert(e);
			}
		}

		setIsAuthenticating(false);
	}

	async function handleLogout() {
		await Auth.signOut();

		userHasAuthenticated(false);

		history.push("/login");
	}

	return (
		// here I'm creating a fixed width container using Bootstrap, adding a navbar inside that container that fits to it's width, and adding some spacing with mb/py
		!isAuthenticating && (
			<div className="App container py-3">
				<Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
					<LinkContainer to="/">
						<Navbar.Brand href="/" className="font-weight-bold text-muted">
							Scratch
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Nav activeKey={window.location.pathname}>
							{isAuthenticated ? (
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							) : (
								<>
									<LinkContainer to="/signup">
										<Nav.Link href="/signup">Sign Up</Nav.Link>
									</LinkContainer>
									<LinkContainer to="/login">
										<Nav.Link href="/login">Login</Nav.Link>
									</LinkContainer>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
					<Routes />
				</AppContext.Provider>
			</div>
		)
	);
}

export default App;

// Link Containers are being utilized to reroute the webpage to a login and signup without reloading the page

// Loading the user session is an asynchronous process, and we want to make sure the app doesn't change states when it first loads. To do this we'll hold off on rendering till isAuthenticating is false. This means we need to conditionally render the app based on the isAuthenticating flag.
// To do this we can wrap the whole render return in a conditional so that if isAuthenticating is false then it will show the logged out homepage.
