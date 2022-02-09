import { calculatedCost } from "../src/util/cost";

test('Lowest tier', () => {
    const storage = 10;

    const cost = 4000;
    const expectedCost = calculatedCost(storage);
    
    expect(cost).toEqual(expectedCost);
});

test('Middle tier', () => {
    const storage = 100;

    const cost = 20000;
    const expectedCost = calculatedCost(storage);

    expect(cost).toEqual(expectedCost);
});

test('Highest tier', () => {
    const storage = 101;

    const cost = 10100;
    const expectedCost = calculatedCost(storage);

    expect(cost).toEqual(expectedCost);
});

/*
The above code uses test functions to ensure that the calculations done by the lambda functions are correct.
The expected cost values are calculated beforehand as we know what they should be,
after we just make sure that what the lambda function calculates is the same as what we want.
we're telling the test function that we expect the cost to be equal to the calculated cost.
*/