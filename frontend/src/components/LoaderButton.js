import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

export default function LoaderButton({
	// These are the parameters for the Loader Button Object
	isLoading,
	className = "",
	disabled = false,
	...props
}) {
	return (
		<Button
			// Here we pass in the arguments to define the button
			disabled={disabled || isLoading}
			className={`LoaderButton ${className}`}
			// props is a Rest Parameter that can take an indefinite number of arguments
			{...props}
		>
			{isLoading && <BsArrowRepeat className="spinning" />}
			{props.children}
		</Button>
	);
}
