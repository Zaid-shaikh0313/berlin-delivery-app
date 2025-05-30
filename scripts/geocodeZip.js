// scripts/geocodeZip.js
const axios = require('axios');

/**
 * Uses Zippopotam.us to look up German postal codes.
 * @param {string} zip — e.g. "10115"
 * @returns {{lat: number, lng: number}}
 */
async function geocodeZip(zip) {
  try {
    const res = await axios.get(`https://api.zippopotam.us/de/${zip}`);
    const place = res.data.places?.[0];
    if (!place) throw new Error('No places found');
    return {
      lat: parseFloat(place.latitude),
      lng: parseFloat(place.longitude),
    };
  } catch (err) {
    console.warn(`⚠️ Geocode failed for ZIP ${zip}: ${err.message}`);
    return { lat: 0, lng: 0 };
  }
}

module.exports = { geocodeZip };
