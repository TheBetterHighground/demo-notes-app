// Here is where we'll create functions that we'll later import into our main JS files.
// These functions will handle the error trapping required for the majority of our functions in a simple way.
// This is just a simple and convenient way to declutter the global scope of the program.
export function onError(error) {
	let message = error.toString();

	// Auth errors
	if (!(error instanceof Error) && error.message) {
		message = error.message;
	}

	alert(message);
}
