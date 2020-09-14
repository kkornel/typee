const sharp = require('sharp');
const DatauriParser = require('datauri/parser');

const getResizedBuffer = async (buffer, width = 250, height = 250) => {
  return await sharp(buffer).resize({ width, height }).png().toBuffer();
};

const getDataUri = (buffer, format = '.png') => {
  return new DatauriParser().format(format, buffer).content;
};

module.exports = {
  getResizedBuffer,
  getDataUri,
};
