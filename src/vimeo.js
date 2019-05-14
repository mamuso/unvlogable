const helpers = require("./helpers.js");

const vimeo = async (videourl, options) => {
  // youtube oembed, returns a json
  const url = `https://vimeo.com/api/oembed.json?url=${videourl}`;

  // gettign the data
  response = await helpers.getData(url);
  let { title, thumbnail_url, html, width, height } = response;

  // making the thumbnail better if we can
  thumbnail_url = thumbnail_url.replace("295x166", "1280x720");

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

module.exports = vimeo;
