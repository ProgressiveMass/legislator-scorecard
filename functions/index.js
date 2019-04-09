const functions = require('firebase-functions')
const express = require('express')
const getLocalLegislatorsData = require('./getLocalLegislatorsData')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// allow requests only from my website, the proxied url, and localhost
const corsOptions = {
  origin: [
    /^https:\/\/progressive-mass.firebaseapp.com\/*/,
    /^https:\/\/scorecard.progressivemass.com\/*/,
    /^https:\/\/progressive-mass-test.firebaseapp.com\/*/,
    /^http:\/\/localhost:.{4}/
  ],
}

// to test in firebase console: api.post('/local-legislators').form({ address: '24 Beacon St, Boston, MA 02133'})

// ========================================================
//  send an address, get your state rep + senator
// ========================================================
app.options('/local-legislators', cors(corsOptions))
app.post('/local-legislators', cors(corsOptions), function(req, res) {
  const address = req.body.address
  if (!address)
    res.status(500).send('Need to provide an address as a query param')

  getLocalLegislatorsData(address)
    .then(data => res.status(200).json(data))
    .catch(e => res.status(500).send(e.toString()))
})

exports.api = functions.https.onRequest(app)
