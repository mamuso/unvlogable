'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const collegehumor = async (videourl, options) => {
  // collegehumor oembed, returns a json
  const url = `http://www.collegehumor.com/oembed.json?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  const videopage = await helpers.getData(videourl);
  const $ = cheerio.load(videopage);
  const ogimage = $('meta[property="og:image"]').attr('content');
  if (ogimage) {
    thumbnail_url = ogimage;
  }

  return { title, thumbnail_url, html, width, height };
};

module.exports = collegehumor;
