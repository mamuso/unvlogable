'use strict';

const helpers = require('./helpers.js');

const twitch = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://api.twitch.tv/v4/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('640x360', '1280x720');

  return { title, thumbnail_url, html, width, height };
};

module.exports = twitch;
