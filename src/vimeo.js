'use strict';

const helpers = require('./helpers.js');
const cheerio = require('cheerio');

const vimeo = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://vimeo.com/api/oembed.json?url=${videourl}`;

  try {
    // gettign the data
    const response = await helpers.getData(url);
    let { title, thumbnail_url, html } = response;

    // making the thumbnail better if we can
    thumbnail_url = thumbnail_url.replace('295x166', '1280x720');

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
  } catch (e) {
    console.error('Error:', e.message, e.stack);
    return {
      error: e.message
    };
  }
};

module.exports = vimeo;
