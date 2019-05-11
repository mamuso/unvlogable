const unvlogable = params => {
  const { videourl } = params;
  return `Check this URL: ${videourl}`;
};

module.exports = unvlogable;
