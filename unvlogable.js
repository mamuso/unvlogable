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

  return `Check this: ${videoservice}`;
};

module.exports = unvlogable;
