'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.facebook.com/plugins/video/oembed.json/?url=${videourl}`;

  // gettign the data
  let { title, thumbnail_url, html, width, height } = await helpers.getData(url);

  const $ = cheerio.load(html);
  const vid = $('blockquote')
    .attr('cite')
    .split('/')
    .slice(-2)[0];

  // returning a title
  title = $('p').html();

  // returning a clean iframe
  html = `<iframe width="${width}" height="${height}" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:video Facebook Social Plugin" src="https://www.facebook.com/v3.3/plugins/video.php?app_id=113869198637480&href=${url}&width=${width}&height=${height}"></iframe>`; /* eslint-disable-line max-len */

  // making the thumbnail better if we can
  thumbnail_url = `https://graph.facebook.com/${vid}/picture`;

  return { title, thumbnail_url, html, width, height };
};

module.exports = youtube;
