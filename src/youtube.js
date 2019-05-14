'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.youtube.com/oembed?url=${videourl}&format=json`;

  // gettign the data
  const response = await helpers.getData(url);
  let { title, thumbnail_url, html } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace('hqdefault', 'maxresdefault');

  const $ = cheerio.load(html);
  // embed width and height
  if (options && options.embed) {
    options.embed.width && $('iframe').attr('width', options.embed.width);
    options.embed.height && $('iframe').attr('height', options.embed.height);
  }

  return {
    title: title,
    thumbnail: thumbnail_url,
    embed: $('body').html(),
    embed_url: $('iframe').attr('src')
  };
};

module.exports = youtube;
