const helpers = require("./helpers.js");

const youtube = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://www.youtube.com/oembed?url=${videourl}&format=json`;

  // gettign the data
  response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace("hqdefault", "maxresdefault");

  // chaging dimensions of the
  if (options && options.embed) {
    html = options.embed.width
      ? html.replace(`width="${width}"`, `width="${options.embed.width}"`)
      : html;
    html = options.embed.height
      ? html.replace(`height="${height}"`, `height="${options.embed.height}"`)
      : html;
  }

  return {
    title: title,
    thumbnail: thumbnail_url,
    embed: html
  };
};

module.exports = youtube;
