import { useState } from "react";

// take the initialState of an object, in this case it will be our form fields.
// We'll initialize a state variable using the useState hook.
// Afterwards we'll return whatever changes were made and use the id to identify the form field and the value to identify what the input is.
export function useFormFields(initialState) {
	const [fields, setValues] = useState(initialState);

	return [
		fields,
		function (event) {
			setValues({
				...fields,
				[event.target.id]: event.target.value,
			});
		},
	];
}
