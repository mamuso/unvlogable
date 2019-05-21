'use strict';

const helpers = require('./helpers.js');

const dailymotion = async (videourl, options) => {
  // dailymotion oembed, returns a json
  const url = `http://www.dailymotion.com/services/oembed?url=${videourl}`;

  // gettign the data
  let { title, thumbnail_url, html, width, height } = await helpers.getData(url);

  // dailymotion returns a 200 when it should return a 404
  if (!html) {
    console.error('Error:', 'Request failed with status code 404');
    throw new Error('Request failed with status code 404');
  }

  return { title, thumbnail_url, html, width, height };
};

module.exports = dailymotion;
