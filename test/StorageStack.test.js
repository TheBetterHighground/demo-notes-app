// This test is meant to check when our storage stack creates
// a DynamoDB table that it's billing mode is set to the default setting so that we didn't accidentally change it
import { Template } from "aws-cdk-lib/assertions";
import * as sst from "@serverless-stack/resources";
import StorageStack from "../stacks/StorageStack";

test('Test StorageStack', () => {
    const app = new sst.App();
    // WHEN
    const stack = new StorageStack(app, "test-stack");
    // Then
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::DynamoDB::Table", {
        BillingMode: "PAY_PER_REQUEST",
    });
});

/*
The above code ensures that whenever a table is created with the API that it has whichever properties
we need the table to have for it to run. It's possible to create tests like this for other
structures that we may need to use in the future. Just make sure that when we run our test environment through Node.js
that we ensure the test structure is stored in a variable that we can then compare to the original template
to ensure that default values were created properly.
*/