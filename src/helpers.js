'use strict';

const axios = require('axios');

// Async function to get a url
const getData = async url => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (e) {
    console.error('Error:', e.message, e.stack);
    throw new Error(e.message);
  }
};

const helpers = {
  getData
};

module.exports = helpers;
