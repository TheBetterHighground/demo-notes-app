import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App() {
	return (
		// here I'm creating a fixed width container using Bootstrap, adding a navbar inside that container that fits to it's width, and adding some spacing with mb/py
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
						<LinkContainer to="/signup">
							<Nav.Link href="/signup">Sign Up</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/login">
							<Nav.Link href="/login">Login</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Routes />
		</div>
	);
}

export default App;

// Link Containers are being utilized to reroute the webpage to a login and signup without reloading the page
