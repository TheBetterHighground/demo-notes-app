import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/contextLib";
import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../lib/errorLib";
import { useFormFields } from "../lib/hooksLib";

export default function Login() {
	// Use the Hook useAppContext
	const { userHasAuthenticated } = useAppContext();
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// the below state variables are used to store whether a process is happening or not
	const [isLoading, setIsLoading] = useState(false);
	const [fields, handleFieldChange] = useFormFields({
		email: "",
		password: "",
	});

	function validateForm() {
		return fields.email.length > 0 && fields.password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			await Auth.signIn(fields.email, fields.password);
			userHasAuthenticated(true);
		} catch (e) {
			onError(e);
			setIsLoading(false);
		}
	}

	return (
		<div className="Login">
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				{/* <Button block size="lg" type="submit" disabled={!validateForm()}>
					Login
				</Button> */}
				<LoaderButton
					block
					size="lg"
					type="submit"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Login
				</LoaderButton>
			</Form>
		</div>
	);
}

/*
At the top of the code we're using one of React's hooks. Specifically the useState hook.
*/
