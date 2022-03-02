import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

// this allows the container to respond to our routes
// the component below uses the Switch component from React-Router that renders the first matching route that is defined within it.
// We only have a single route so it looks for / and renders the Home component.
// the exact keyword is called to make sure that the route is matched properly otherwise we'd get logic errors in the code.
export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<UnauthenticatedRoute exact path="/login">
				<Login />
			</UnauthenticatedRoute>
			<UnauthenticatedRoute exact path="/signup">
				<Signup />
			</UnauthenticatedRoute>
			<AuthenticatedRoute exact path="/settings">
				<Settings />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/notes/new">
				<NewNote />
			</AuthenticatedRoute>
			<AuthenticatedRoute exact path="/notes/:id">
				<Notes />
			</AuthenticatedRoute>
			{/*
            This will be used to catch any unmatched routes
            MAKE SURE THAT THIS IS THE LAST ROUTE IN THE SWITCH BLOCK. ALWAYS!
            */}
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}
