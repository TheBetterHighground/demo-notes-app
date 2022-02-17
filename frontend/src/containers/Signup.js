// We'll need to import react, some hooks, the form element, our loader button component, and the custome js we wrote.
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/contextLib";
import { useFormFields } from "../lib/hooksLib";
import { onError } from "../lib/errorLib";
import { Auth } from "aws-amplify";
import "./Signup.css";

export default function Signup() {
	const [fields, handleFieldChange] = useFormFields({
		email: "",
		password: "",
		confirmPassword: "",
		confirmationCode: "",
	});
	// initialize the state variables the sign up will use and set them to falsey values.
	const history = useHistory();
	const [newUser, setNewUser] = useState(null);
	const { userHasAuthenticated } = useAppContext();
	const [isLoading, setIsLoading] = useState(false);

	// A very basic implementation of making sure that there are no empty values in the form and that the passwords are equal to each other.
	function validateForm() {
		return (
			fields.email.length > 0 &&
			fields.password.length > 0 &&
			fields.password === fields.confirmPassword
		);
	}

	// Make sure that when they enter the confirmation code the field is not empty
	function validateConfirmationForm() {
		return fields.confirmationCode.length > 0;
	}

	// function that will deal with submitting the form but not affect the page as its async
	async function handleSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		// Currently test but will change later, purely for building purposes
		// setNewUser("test");

		// Here is where we connect to AWS Cognito
		try {
			const newUser = await Auth.signUp({
				username: fields.email,
				password: fields.password,
			});
			setIsLoading(false);
			setNewUser(newUser);
		} catch (e) {
			onError(e);
			if (e.name === "UsernameExistsException") {
				const currentUser = {
					username: fields.email,
				};

				setNewUser(currentUser);
			}
			setIsLoading(false);
		}
	}

	// async function handleConfirmationResend(event) {
	// 	event.preventDefault();

	// 	setIsLoading(true);

	// 	try {
	// 		await Auth.resendSignUp(fields.email, fields.confirmationCode);
	// 		history.push("/login");
	// 		setIsLoading(false);
	// 	} catch (e) {
	// 		onError(e);
	// 		if (e.name === "UserNotConfirmedException") {
	// 		}
	// 		setIsLoading(false);
	// 	}
	// }

	// function to handle confirmation code submission
	async function handleConfirmationSubmit(event) {
		event.preventDefault();

		setIsLoading(true);

		try {
			// check to confirm the sign up via confirmation code
			await Auth.confirmSignUp(fields.email, fields.confirmationCode);
			// Sign the new user in
			await Auth.signIn(fields.email, fields.password);

			// Tell the program they are authenticated
			userHasAuthenticated(true);
			// Return to homepage
			history.push("/");
			setIsLoading(false);
		} catch (e) {
			onError(e);
			if (e.name === "UserNotConfirmedException") {
				Auth.resendSignUp(fields.email, fields.confirmationCode);
			}
			setIsLoading(false);
		}
	}

	// This function will render just the confirmation form after finishing sign up.
	function renderConfirmationForm() {
		return (
			<Form onSubmit={handleConfirmationSubmit}>
				<Form.Group controlId="confirmationCode" size="lg">
					<Form.Label>Confirmation Code</Form.Label>
					<Form.Control
						autoFocus
						type="tel"
						onChange={handleFieldChange}
						value={fields.confirmationCode}
					/>
					<Form.Text muted>Please check your email for the code.</Form.Text>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateConfirmationForm()}
				>
					Verify
				</LoaderButton>
			</Form>
		);
	}

	function renderForm() {
		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email" size="lg">
					<Form.Label>Email</Form.Label>
					<Form.Control
						autoFocus
						type="email"
						value={fields.email}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="password" size="lg">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={fields.password}
						onChange={handleFieldChange}
					/>
				</Form.Group>
				<Form.Group controlId="confirmPassword" size="lg">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						onChange={handleFieldChange}
						value={fields.confirmPassword}
					/>
				</Form.Group>
				<LoaderButton
					block
					size="lg"
					type="submit"
					variant="success"
					isLoading={isLoading}
					disabled={!validateForm()}
				>
					Signup
				</LoaderButton>
			</Form>
		);
	}

	// Above we created two different render functions, one for the user just signing up and the other for confirming once they are.
	// The event loop will handle this return statement and continuously check if the newUser prop is null.
	// If it is null then we'll render the form like usual, but if not then we'll display the confirmation form.
	return (
		<div className="Signup">
			{newUser === null ? renderForm() : renderConfirmationForm()}
		</div>
	);
}
