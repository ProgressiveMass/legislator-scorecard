var env;
if (process.env.STAGING) {
  env = 'staging';
} else if (process.env.PRODUCTION){
  env = 'production';
} else {
  env = 'development';
}
const result = require("dotenv").config({
  path: '.env.' + env,
})
const request = require('request')
const fs = require('fs')
if (result.error) {
  throw result.error
}

const houseLegislators = require('../src/data/house_legislators.json')
const senateLegislators = require('../src/data/senate_legislators.json')
const domain = process.env.GATSBY_DOMAIN;

houseLegislators.concat(senateLegislators).forEach(legislator => {

  const ogImageFilename =
    (legislator.name + '-' + legislator.district)
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[.,']/g, '')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");  // stackoverflow.com/questions/990904
  const url = `${domain}og-images/legislator/${ogImageFilename}.png`;
  request(url).pipe(fs.createWriteStream('test/tmp/' + ogImageFilename));
});

