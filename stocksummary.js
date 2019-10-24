const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv.slice(2)[0];
const app = express();
app.use(bodyParser.json());

const powers = [
   { id: 1, name: 'International Business Machines' },
   { id: 2, name: 'Cisco' },
   { id: 3, name: 'Honeywell' },
   { id: 4, name: 'Creative Controllers'},
   { id: 5, name: 'Tranque Inc' }
];

const stocksummary = [
   {
       id: 1,
       previous_close: 9.52,
       open: 9.53,
       displayName: 'GTX',
       busy: false
   },
   {
       id: 2,
       previous_close: 8.89,
       open: 8.82,
       displayName: 'CSCO',
       busy: false
   },
   {
       id: 3,
       previous_close:7.73,
       open: 7.82,
       displayName: 'MSFT',
       busy: false
   },
   {
       id: 4,
       previous_close:6.63,
       open: 6.62,
       displayName: 'HON',
       busy: false
   }
];

app.get('/heroes', (req, res) => {
   console.log('Returning stocks summary list');
   res.send(heroes);
});

app.get('/powers', (req, res) => {
   console.log('Returning powers list');
   res.send(powers);
});

//
// This can be only posted !
// since this is a POST, I cannot do a GET
// curl -i --request POST --header "Content-Type: application/json" --data '{"stocksummaryId": 4}' localhost:8081/hero
// 
app.post('/stocksummary/**', (req, res) => {
   const stocksummaryId = req.params[0];
   console.log ( "the stocksummaryId is ", stocksummaryId);
   const foundSummary = stocksummary.find(subject => subject.id == stocksummaryId);
   console.log ( "the stocksummmary post is ", foundSummary);

   if (foundSummary) {
       res.status(202).header({Location: `http://localhost:${port}/stocksummary/${foundSummary.id}`}).send(foundSummary);
   } else {
       console.log(`Stock Summary not found.`);
       res.status(404).send();
   }
});

//app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Heroes service listening on port ${port}`);
app.listen(port);
