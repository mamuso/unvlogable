'use strict';

const helpers = require('./helpers.js');

const giphy = async (videourl, options) => {
  // vimeo oembed, returns a json
  const apiurl = `https://giphy.com/services/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(apiurl);
  let { title, url, width, height } = response;

  // get the element id
  const vid = url
    .split('giphy.com/media/')
    .slice(-1)[0]
    .split('/giphy.')
    .slice(0)[0];

  // making the thumbnail better if we can
  const thumbnail_url = url;

  // let's build the embed code
  const html = `<iframe src="https://giphy.com/embed/${vid}" width="480" height="262" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`; /* eslint-disable-line max-len */

  return { title, thumbnail_url, html, width, height };
};

module.exports = giphy;
