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
const twitchurl = 'https://www.twitch.tv/videos/425338074';
const metacafeurl = 'http://www.metacafe.com/watch/11560991/this-is-what-happens-when-a-cow-falls-in-love-for-a-man/';
const metacafenotvideourl =
  'http://www.metacafe.com/watch/115609asdfg91/this-is-what-happens-when-a-cow-falls-in-love-for-a-man/';
const gfycaturl = 'https://gfycat.com/boringmerryhyena-michaela-coel-chewing-gum-awkward';
const giphyurl = 'https://giphy.com/gifs/80s-back-to-the-future-happening-now-ktRHi4nFxNDOw';
const livestreamurl = 'https://livestream.com/accounts/4175709/nestcam/videos/87117623';
const myspaceurl = 'https://myspace.com/cypher.sessions/video/cypher-sessions-lex/109851405';
const myspacemusicurl = 'https://myspace.com/pharrell/music/song/happy-from-despicable-me-2-97026930-108159781';
const tiktokurl = 'https://www.tiktok.com/share/video/6620861036838784261';
const facebookurl = 'https://www.facebook.com/trynottolaughpets/videos/2251864448405525';

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

describe('testing optionA implementation', () => {
  test('using a url', async () => {
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

  test('using a valid url with embed options', async () => {
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

  test('using a short url', async () => {
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

  test('using an array of urls with embed options', async () => {
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

describe('testing option C implementation', () => {
  test('using a valid url', async () => {
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

describe('testing benchmark implementation', () => {
  test('using a valid url', async () => {
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

  test('using a non valid url', async () => {
    expect.assertions(1);
    const data = await unvlogable(collegehumornotvideourl);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

describe('testing redirection implementation', () => {


  test('using a non valid url', async () => {
    expect.assertions(1);
    const data = await unvlogable(`${dailymotionurl}1234`);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

describe('testing status implementation', () => {
  test('using a status url', async () => {
    expect.assertions(1);
    const data = await unvlogable(twitchurl);
    expect(data).toMatchObject({
      provider_name: 'twitch',
      title: expect.stringMatching('Mario Maker 2 Live Reactions'),
      thumbnail_url: expect.stringMatching(
        'https://static-cdn.jtvnw.net/s3_vods/948ac833e8456154887f_kindafunnygames_34132255712_1201926963/thumb/thumb0-1280x720.jpg' /* eslint-disable-line max-len */
      ),
      html: expect.stringContaining(
        '<iframe src="https://player.twitch.tv/?%21branding=&amp;autoplay=false&amp;video=v425338074" width="500" height="281" frameborder="0" scrolling="no" allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('using a non status url', async () => {
    expect.assertions(1);
    const data = await unvlogable(`${twitchurl}1234`);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

describe('testing DDoS defense implementation', () => {

  test('Recovery strategy', async () => {
    expect.assertions(1);
    const data = await unvlogable(`${metacafenotvideourl}`);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

describe('testing multi-fetching implementation', () => {
  test('using an array of urls', async () => {
    expect.assertions(1);
    const data = await unvlogable(gfycaturl);
    expect(data).toMatchObject({
      provider_name: 'gfycat',
      title: expect.stringMatching('Michaela Coel - Chewing Gum Hi'),
      thumbnail_url: expect.stringMatching('https://thumbs.gfycat.com/BoringMerryHyena-mobile.jpg'),
      html: expect.stringContaining(
        '<iframe src="https://gfycat.com/ifr/boringmerryhyena" frameborder="0" scrolling="no" width="100%" height="100%" style allowfullscreen></iframe>' /* eslint-disable-line max-len */
      )
    });
  });

  test('parsing urls from text', async () => {
    expect.assertions(1);
    const data = await unvlogable(`${metacafenotvideourl}`);
    expect(data).toMatchObject({
      error: expect.stringContaining('Request failed with status code 404')
    });
  });
});

