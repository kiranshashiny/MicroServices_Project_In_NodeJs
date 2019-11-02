const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const port = process.argv.slice(2)[0];
const app = express();

app.use(bodyParser.json());

const heroesService = 'http://localhost:8081';

const stockNames = [
  {
      id: 1,
      displayName: 'CSCO',
  },
  {
      id: 2,
      displayName: 'MSFT',
  },
  {
      id: 3,
      displayName: 'IBM',
  }
];

app.get('/stockNames', (req, res) => {
  console.log('Returning stockNames list');
  res.send(stockNames);
});

app.post('/assignment', (req, res) => {
  console.log ( "shashi - the In stocks.js ")
  console.log ( "stocksummaryId is ", req.body.stocksummaryId)
  console.log ( "stocks      id is ", req.body.stockId)

  request.post({
      headers: {'content-type': 'application/json'},
      url: `${heroesService}/stocksummary/${req.body.stocksummaryId}`,
      body: `{
          "busy": true
      }`
  }, (err, heroResponse, body) => {
      if (!err) {
	  console.log ("shashi is this stock summary ?", heroResponse.body )
          res.status(202).send(heroResponse.body);
          //res.status(202).send(threat);
      } else {
          res.status(400).send({problem: `Hero Service responded with issue ${err}`});
      }
  });
});

console.log(`Stocks service listening on port ${port}`);
app.listen(port);
