'use strict';

const helpers = require('./helpers.js');

const twitch = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://api.twitch.tv/v4/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // twitch returns a 200 when it should return a 404
  if (!html) {
    console.error('Error:', 'Request failed with status code 404');
    throw new Error('Request failed with status code 404');
  }

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('640x360', '1280x720');

  return { title, thumbnail_url, html, width, height };
};

module.exports = twitch;
