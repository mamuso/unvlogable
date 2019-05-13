const axios = require("axios");

// Async function to get a url
const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const helpers = {
  getData
};

module.exports = helpers;
