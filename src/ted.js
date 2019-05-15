'use strict';

const helpers = require('./helpers.js');

const ted = async (videourl, options) => {
  // ted oembed, returns a json
  const url = `https://www.ted.com/services/v1/oembed.json?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('?h=316&w=560', '');

  return { title, thumbnail_url, html, width, height };
};

module.exports = ted;
