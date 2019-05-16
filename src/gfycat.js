'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const gfycat = async (videourl, options) => {
  // vimeo oembed, returns a json
  const url = `https://api.gfycat.com/v1/oembed?url=${videourl}`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, html, width, height } = response;

  // get the element id
  const vid = videourl
    .split('gfycat.com/')
    .slice(-1)[0]
    .split('-')
    .slice(0)[0];

  // calling the api again
  const gfycats = `https://api.gfycat.com/v1/gfycats/${vid}`;

  // gettign the data
  const gfycatsresponse = await helpers.getData(gfycats);
  let thumbnail_url = gfycatsresponse.gfyItem.mobilePosterUrl;

  // cleaning the html
  const $ = cheerio.load(html);
  html = $('iframe')
    .parent()
    .html();

  // cleaning
  return { title, thumbnail_url, html, width, height };
};

module.exports = gfycat;
