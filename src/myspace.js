'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const myspace = async (videourl, options) => {
  // fishing the information from the page
  const videopage = await helpers.getData(videourl);
  const $ = cheerio.load(videopage);

  const videocheck = $('meta[property="video:release_date"]').attr('content');
  console.log(`videocheck ${videocheck}`);
  if (!videocheck) {
    console.error('Error:', 'Request failed with status code 404');
    throw new Error('Request failed with status code 404');
  }

  const title = $('meta[name="twitter:title"]').attr('content');
  const thumbnail_url = $('meta[name="twitter:image"]').attr('content');
  let html = $('meta[name="twitter:player"]').attr('content');
  const width = $('meta[name="twitter:player:width"]').attr('content');
  const height = $('meta[name="twitter:player:height"]').attr('content');

  html = `<iframe width="${width}" height="${height}" src="${html.replace(
    'watch',
    'embed'
  )}" frameborder="0" allowfullscreen></iframe>`;

  return { title, thumbnail_url, html, width, height };
};

module.exports = myspace;
