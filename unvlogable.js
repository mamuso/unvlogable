const parseDomain = require("parse-domain");

const unvlogable = (videourl, options) => {
  // We can't do anything without a video url
  if (!videourl) {
    return false;
  }

  // We can't do anything without a video service
  const videoservice = parseDomain(videourl)
    ? parseDomain(videourl).domain.toLowerCase()
    : null;
  if (!videoservice) {
    return false;
  }

  let videotron = {};

  // return unvlogable[videoservice]();

  return videotron;
};

// Services
unvlogable.youtube = require("./src/youtube");
unvlogable.youtu = require("./src/youtube");
unvlogable.vimeo = require("./src/vimeo");

module.exports = unvlogable;
