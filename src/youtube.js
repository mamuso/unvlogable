'use strict';

const helpers = require('./helpers.js');

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.youtube.com/oembed?url=${videourl}&format=json`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('hqdefault', 'maxresdefault');

  return { title, thumbnail_url, html };
};

module.exports = youtube;
