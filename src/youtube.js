const helpers = require("./helpers.js");

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.youtube.com/oembed?url=${videourl}&format=json`;

  // gettign the data
  response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace("hqdefault", "maxresdefault");

  return {
    title: title,
    thumbnail: thumbnail_url,
    embed: html
  };
};

module.exports = youtube;
