const unvlogable = require("../unvlogable");

test("calling without a url shoud return false", () => {
  expect(unvlogable()).toBe(false);
});
