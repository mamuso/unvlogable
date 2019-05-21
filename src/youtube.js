'use strict';

const helpers = require('./helpers.js');

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.youtube.com/oembed?url=${videourl}&format=json`;

  // gettign the data
  let { title, thumbnail_url, html, width, height } = await helpers.getData(url);

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('hqdefault', 'maxresdefault');

  return { title, thumbnail_url, html, width, height };
};

module.exports = youtube;
