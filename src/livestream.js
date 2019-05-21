'use strict';

const helpers = require('./helpers.js');

const livestream = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://livestream.com/oembed?url=${videourl}`;

  // gettign the data
  let { title, thumbnail_url, html, width, height } = await helpers.getData(url);

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('150x84', '1280x720');

  return { title, thumbnail_url, html, width, height };
};

module.exports = livestream;
