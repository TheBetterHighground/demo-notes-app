// This is the main container that I'll be using for this front end.
// The containers are the top level components that will respond to the routes and make requests to the API.
import React from "react";
import "./Home.css";

// render the homepage default when a user is not logged in
export default function Home() {
	return (
		<div className="Home">
			<div className="lander">
				<h1>Scratch</h1>
				<p className="text-muted">A simple note taking app</p>
			</div>
		</div>
	);
}
