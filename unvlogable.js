'use strict';

const parseDomain = require('parse-domain');
const cheerio = require('cheerio');

const unvlogable = async (videourl, options) => {
  // We can't do anything without a video url
  if (!videourl) {
    return false;
  }

  // We can't do anything without a video service
  let videoservice = parseDomain(videourl) ? parseDomain(videourl).domain.toLowerCase() : null;
  if (!videoservice || typeof unvlogable[videoservice] !== 'function') {
    return false;
  }
  videoservice === 'youtu' && (videoservice = 'youtube');

  let videotron = {};

  try {
    let { title, thumbnail_url, html, width, height } = await unvlogable[videoservice](videourl, options);

    const $ = cheerio.load(html);

    // embed width and height
    if (options && options.embed) {
      options.embed.width && $('iframe').attr('width', options.embed.width);
      options.embed.height && $('iframe').attr('height', options.embed.height);
    }

    videotron = {
      type: 'video',
      version: '1.0',
      provider_name: videoservice,
      title: title,
      thumbnail_url: thumbnail_url,
      html: $('body').html(),
      width: width,
      height: height
    };
  } catch (e) {
    console.error('Error:', e.message, e.stack);
    return {
      error: e.message
    };
  }

  return videotron;
};

// Services
unvlogable.youtube = require('./src/youtube');
unvlogable.youtu = require('./src/youtube');
unvlogable.vimeo = require('./src/vimeo');
unvlogable.ted = require('./src/ted');
unvlogable.collegehumor = require('./src/collegehumor');
unvlogable.dailymotion = require('./src/dailymotion');

module.exports = unvlogable;
