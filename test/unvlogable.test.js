const unvlogable = require("../unvlogable");

// Test urls
const youtubeurl = "https://www.youtube.com/watch?v=mqOEzEPZ8iw";
const youtuurl = "https://youtu.be/Sj3Fsgx6NAg";

// Options
const embedoptions = { embed: { width: "800", height: "600" } };

test("calling without a url shoud return false", async () => {
  expect.assertions(1);
  const data = await unvlogable();
  expect(data).toBe(false);
});

describe("testing youtube implementation", () => {
  test("using a youtube url", async () => {
    expect.assertions(1);
    const data = await unvlogable(youtubeurl);
    expect(data).toMatchObject({
      title: expect.stringContaining("OP-1 07-01-18 (Magic)"),
      thumbnail: expect.stringContaining(
        "https://i.ytimg.com/vi/mqOEzEPZ8iw/maxresdefault.jpg"
      ),
      embed: expect.stringContaining(
        '<iframe width="480" height="270" src="https://www.youtube.com/embed/mqOEzEPZ8iw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      )
    });
  });

  test("using a youtube url with embed options", async () => {
    expect.assertions(1);
    const data = await unvlogable(youtubeurl, embedoptions);
    expect(data).toMatchObject({
      title: expect.stringContaining("OP-1 07-01-18 (Magic)"),
      thumbnail: expect.stringContaining(
        "https://i.ytimg.com/vi/mqOEzEPZ8iw/maxresdefault.jpg"
      ),
      embed: expect.stringContaining(
        '<iframe width="800" height="600" src="https://www.youtube.com/embed/mqOEzEPZ8iw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      )
    });
  });

  test("using a short youtube url", async () => {
    expect.assertions(1);
    const data = await unvlogable(youtuurl);
    expect(data).toMatchObject({
      title: expect.stringContaining("Adventure Audio - Merge"),
      thumbnail: expect.stringContaining(
        "https://i.ytimg.com/vi/Sj3Fsgx6NAg/maxresdefault.jpg"
      ),
      embed: expect.stringContaining(
        '<iframe width="480" height="270" src="https://www.youtube.com/embed/Sj3Fsgx6NAg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      )
    });
  });

  test("using a short youtube url with embed options", async () => {
    expect.assertions(1);
    const data = await unvlogable(youtuurl, embedoptions);
    expect(data).toMatchObject({
      title: expect.stringContaining("Adventure Audio - Merge"),
      thumbnail: expect.stringContaining(
        "https://i.ytimg.com/vi/Sj3Fsgx6NAg/maxresdefault.jpg"
      ),
      embed: expect.stringContaining(
        '<iframe width="800" height="600" src="https://www.youtube.com/embed/Sj3Fsgx6NAg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
      )
    });
  });
});
