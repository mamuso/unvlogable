'use strict';

const helpers = require('./helpers.js');

const livestream = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://livestream.com/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('150x84', '1280x720');

  return { title, thumbnail_url, html, width, height };
};

module.exports = livestream;
