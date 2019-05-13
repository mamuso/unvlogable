const unvlogable = require("../unvlogable");

// test urls
const youtubeurl = "https://www.youtube.com/watch?v=mqOEzEPZ8iw";
const youtuurl = "https://youtu.be/Sj3Fsgx6NAg";

test("calling without a url shoud return false", async () => {
  expect.assertions(1);
  const data = await unvlogable();
  expect(data).toBe(false);
});

// Youtube test
test("calling with a youtube url", async () => {
  expect.assertions(2);
  const data = await unvlogable("https://www.youtube.com/watch?v=mqOEzEPZ8iw");
  expect(data).not.toBe(null);
  expect(data.title).toBe("OP-1 07-01-18 (Magic)");
});

// test("calling without a youtu.be url", () => {
//   expect(unvlogable(youtuurl)).toBe(false);
// });
