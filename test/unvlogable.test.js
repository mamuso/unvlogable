'use strict';

const unvlogable = require('../unvlogable');

// Test urls
const unsupportedurl = 'https://tapas.io/series/gameboylands';
const inexistenturl = 'https://www.youtube.com/watch?v=mqOE8iw';
const youtubeurl = 'https://www.youtube.com/watch?v=mqOEzEPZ8iw';
const youtuurl = 'https://youtu.be/Sj3Fsgx6NAg';
const vimeourl = 'https://vimeo.com/243244233';
const tedurl = 'https://www.ted.com/talks/matt_walker_sleep_is_your_superpower';
const collegehumorurl = 'http://www.collegehumor.com/video/40004560/eat-mayo-wherever-you-go';
const collegehumornotvideourl =
  'http://www.collegehumor.com/post/7014600/5-differences-between-college-freshmen-and-college-seniors';
const dailymotionurl = 'https://www.dailymotion.com/video/x77rfy1';

// Options
const embedoptions = { embed: { width: '800', height: '600' } };

test('calling without a url shoud return false', async () => {
  expect.assertions(1);
  const data = await unvlogable();
  expect(data).toBe(false);
});

test('calling with an unsuppoerted url should return false', async () => {
  expect.assertions(1);
  const data = await unvlogable(unsupportedurl);
  expect(data).toBe(false);
});

test('calling with an inexistent url should throw an error', async () => {
  expect.assertions(1);
  const data = await unvlogable(inexistenturl);
  expect(data).toMatchObject({
    error: expect.stringContaining('Request failed with status code 404')
  });
});

describe('testing youtube implementation', () => {
  test('using a youtube url', async () => {
    expect.assertions(1);
    const data = await unvlogable(youtubeurl);
    expect(data).toMatchObject({
      provider_name: 'youtube',
      title: expect.stringContaining('OP-1 07-01-18 (Magic)'),
      thumbnail_url: expect.stringContaining('https://i.ytimg.com/vi/mqOEzEPZ8iw/maxresdefault.jpg'),
      html: expect.stringContaining(
        '<iframe width="480" height="270" src="https://www.youtube.com/embed/mqOEzEPZ8iw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a youtube url with embed options', async () => {
    expect.assertions(1);
    const data = await unvlogable(youtubeurl, embedoptions);
    expect(data).toMatchObject({
      provider_name: 'youtube',
      title: expect.stringContaining('OP-1 07-01-18 (Magic)'),
      thumbnail_url: expect.stringContaining('https://i.ytimg.com/vi/mqOEzEPZ8iw/maxresdefault.jpg'),
      html: expect.stringContaining(
        '<iframe width="800" height="600" src="https://www.youtube.com/embed/mqOEzEPZ8iw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a short youtube url', async () => {
    expect.assertions(1);
    const data = await unvlogable(youtuurl);
    expect(data).toMatchObject({
      provider_name: 'youtube',
      title: expect.stringContaining('Adventure Audio - Merge'),
      thumbnail_url: expect.stringContaining('https://i.ytimg.com/vi/Sj3Fsgx6NAg/maxresdefault.jpg'),
      html: expect.stringContaining(
        '<iframe width="480" height="270" src="https://www.youtube.com/embed/Sj3Fsgx6NAg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a short youtube url with embed options', async () => {
    expect.assertions(1);
    const data = await unvlogable(youtuurl, embedoptions);
    expect(data).toMatchObject({
      provider_name: 'youtube',
      title: expect.stringContaining('Adventure Audio - Merge'),
      thumbnail_url: expect.stringContaining('https://i.ytimg.com/vi/Sj3Fsgx6NAg/maxresdefault.jpg'),
      html: expect.stringContaining(
        '<iframe width="800" height="600" src="https://www.youtube.com/embed/Sj3Fsgx6NAg?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });
});

describe('testing vimeo implementation', () => {
  test('using a vimeo url', async () => {
    expect.assertions(1);
    const data = await unvlogable(vimeourl);
    expect(data).toMatchObject({
      provider_name: 'vimeo',
      title: expect.stringContaining('Unexpected Discoveries'),
      thumbnail_url: expect.stringContaining('https://i.vimeocdn.com/video/748767326_1280x720.jpg'),
      html: expect.stringContaining(
        '<iframe src="https://player.vimeo.com/video/243244233?app_id=122963" width="426" height="240" frameborder="0" title="Unexpected Discoveries" allow="autoplay; fullscreen" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });
});

describe('testing ted.com implementation', () => {
  test('using a ted url', async () => {
    expect.assertions(1);
    const data = await unvlogable(tedurl);
    expect(data).toMatchObject({
      provider_name: 'ted',
      title: expect.stringContaining('Matt Walker: Sleep is your superpower'),
      thumbnail_url: expect.stringContaining(
        'https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/0a95ffba-8cfe-4d9c-8913-736275f78bf9/MatthewWalker_2019-embed.jpg' /* eslint-disable-line max-len */
      ),
      html: expect.stringContaining(
        '<iframe src="https://embed.ted.com/talks/matt_walker_sleep_is_your_superpower" width="560" height="316" frameborder="0" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });
});

describe('testing collegehumor implementation', () => {
  test('using a collegehumor url', async () => {
    expect.assertions(1);
    const data = await unvlogable(collegehumorurl);
    expect(data).toMatchObject({
      provider_name: 'collegehumor',
      title: expect.stringContaining('Eat Mayo Wherever You Go'),
      thumbnail_url: expect.stringContaining(
        'http://2.media.collegehumor.cvcdn.com/39/59/2da787654a97800493afbdb85a9d6f21-eat-mayo-wherever-you-go.jpeg'
      ),
      html: expect.stringContaining(
        '<iframe src="http://www.collegehumor.com/e/40004560" width="610" height="343" frameborder="0" webkitallowfullscreen allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a non video url', async () => {
    expect.assertions(1);
    const data = await unvlogable(collegehumornotvideourl);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

describe('testing dailymotion implementation', () => {
  test('using a dailymotion url', async () => {
    expect.assertions(1);
    const data = await unvlogable(dailymotionurl);
    expect(data).toMatchObject({
      provider_name: 'dailymotion',
      title: expect.stringMatching('Former CIA Chief of Disguise Breaks Down Spy Scenes From Film & TV'),
      thumbnail_url: expect.stringContaining('ssl.dmcdn.net/v/Q0Mnv1SsW57svf1Z7/x240'),
      html: expect.stringContaining(
        '<iframe frameborder="0" width="480" height="269" src="https://www.dailymotion.com/embed/video/x77rfy1" allowfullscreen allow="autoplay"></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a non video url', async () => {
    expect.assertions(1);
    const data = await unvlogable(`${dailymotionurl}1234`);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});
