'use strict';

const helpers = require('./helpers.js');

const tiktok = async (videourl, options) => {
  // ted oembed, returns a json
  const url = `https://www.tiktok.com/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height, errMsg } = response;

  if (errMsg) {
    console.error('Error:', 'Request failed with status code 404');
    throw new Error('Request failed with status code 404');
  }

  return { title, thumbnail_url, html, width, height };
};

module.exports = tiktok;
