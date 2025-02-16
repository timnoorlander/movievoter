import { calculateResults } from "./calculate-results";

test("calulates the results for three sets of votes", () => {
  const mockedVotes = [
    ["a", "b", "c"],
    ["a", "b", "c"],
    ["c", "b", "a"],
  ];

  const result = calculateResults(mockedVotes);

  const expectedResult = {
    a: 7,
    b: 6,
    c: 5,
  };

  expect(result).toStrictEqual(expectedResult);
});

test("calulates the results for two sets of votes", () => {
  const mockedVotes = [
    ["a", "b", "c"],
    ["b", "c", "a"],
  ];

  const result = calculateResults(mockedVotes);

  const expectedResult = {
    a: 4,
    b: 5,
    c: 3,
  };

  expect(result).toStrictEqual(expectedResult);
});

test("calculation results in draw", () => {
  const mockedVotes = [
    ["b", "a", "c"],
    ["a", "b", "c"],
  ];

  const result = calculateResults(mockedVotes);

  const expectedResult = {
    a: 5,
    b: 5,
    c: 2,
  };

  expect(result).toStrictEqual(expectedResult);
});
