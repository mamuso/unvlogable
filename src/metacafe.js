'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const metacafe = async (videourl, options) => {
  // fishing the information from the page
  const videopage = await helpers.getData(videourl);
  const $ = cheerio.load(videopage);
  const title = $('meta[name="twitter:title"]').attr('content');
  const thumbnail_url = $('meta[name="twitter:image"]').attr('content');
  const html = $('meta[name="twitter:url"]').attr('content');
  const width = $('meta[name="twitter:image:width"]').attr('content');
  const height = $('meta[name="twitter:image:height"]').attr('content');

  return { title, thumbnail_url, html, width, height };
};

module.exports = metacafe;
