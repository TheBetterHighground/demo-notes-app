import { Storage } from "aws-amplify";

export async function s3Upload(file) {
	const filename = `${Date.now()}-${file.name}`;

	const stored = await Storage.vault.put(filename, file, {
		contentType: file.type,
	});

	return stored.key;
}

// not the best way to create a unique file name but for now it works. probably be better with a hashing algorithm.
