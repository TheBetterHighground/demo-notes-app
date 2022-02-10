// Imports the sst api from the files that were created using node
import * as sst from "@serverless-stack/resources";

// Set up the main class function that the JS file will run
export default class StorageStack extends sst.Stack {
    // Public reference to the bucket
    bucket;
    // Public reference to the table
    // By making this public and exposing it, we can use the table in other stacks
    table;

    // Reformat the constructor class to do something new
    constructor(scope, id, props) {
        super(scope, id, props);

        // Create an S3 bucket
        this.bucket = new sst.Bucket(this, "Uploads", {
            s3Bucket: {
                // Allow client side access to the bucket from a different domain
                cors: [
                    {
                        maxAge: 3000,
                        allowedOrigins: ["*"],
                        allowedHeaders: ["*"],
                        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                    },
                ],
            },
        });

        // Create the DynamoDB table
        this.table = new sst.Table(this, "Notes", {
            // these are the rows of the table Notes
            fields: {
                userId: sst.TableFieldType.STRING,
                noteId: sst.TableFieldType.STRING,
            },
            // here we assign the primary keys in DynamoDB, note these are always unique
            primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
        });
    }
}