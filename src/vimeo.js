'use strict';

const helpers = require('./helpers.js');

const vimeo = async (videourl, options) => {
  // vimeo oembed, returns a json
  const url = `https://vimeo.com/api/oembed.json?url=${videourl}`;

  // gettign the data
  let { title, thumbnail_url, html, width, height } = await helpers.getData(url);

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('295x166', '1280x720');

  return { title, thumbnail_url, html, width, height };
};

module.exports = vimeo;
