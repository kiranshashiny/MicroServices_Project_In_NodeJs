const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb");

var nameSchema = new mongoose.Schema({
    Symbol: String,
    Name: String,
    LastSale:  String,
    MarketCap: String, 
    IPOyear:   String, 
    Sector:    String,
    Industry:  String
});

var User = mongoose.model("User", nameSchema);

    // define Schema
    var StockSummarySchema = mongoose.Schema({
        Symbol: String,
        Name: String,
        LastSale: String,
        MarketCap: String,
        IPOyear: String,
        Sector: String,
        Industry:String
    });

    // compile schema to model
    var stocksummary = mongoose.model('Book', StockSummarySchema, 'stocksummary');

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
/*
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
*/

// Not being used anymore !
app.get('/heroes', (req, res) => {
   console.log('Returning stocks summary list');
   res.send(heroes);
});
// 
app.get('/stockSummary', (req, res) => {
   console.log('Returning stocks summary list');
   res.send(stocksummary);
});


//
// This can be only posted !
// since this is a POST, I cannot do a GET
// curl -i --request POST --header "Content-Type: application/json" --data '{"stocksummaryId": 4}' localhost:8081/stocksummary/4
// http://localhost:8081/stocksummary/4
// 
app.post('/stocksummary/**', (req, res) => {

   const stocksummaryId = req.params[0];
   console.log ( "the stocksummaryId is ", stocksummaryId);
 
   /*const foundSummary = stocksummary.find(subject => subject.displayName === stocksummaryId);

   console.log ("Found stocksummmary details i.e ", foundSummary); */
   // find just one. GTX, ATEN. This is for data inserted using Mongoose.

   stocksummary.find({
        Symbol: stocksummaryId,
   }, function (err, summarydetails) {
        if (err) {
            console.log('Symbol Not Found');
            res.status(400);
        }
	console.log ( "Printing all the details ..");
        console.log ( summarydetails );
        
        summarydetails.forEach(function(element) {
                console.log ( "Symbol :", element.Symbol);
                console.log ( "Name: ", element.Name);
                
        	res.status(202).header({Location: `http://localhost:${port}/stocksummary/${element.Symbol}`}).send(element.Symbol);
        });
   });

   /*MongoClient.connect(url, function(err, db) {
	   if (err) throw err;
	   var dbo = db.db("mydb");
	   // find just one. GTX, ATEN
	   const cursor = dbo.collection('stocks_summary').find({ Symbol: "WUBA" }).toArray( function ( err, result ) {
	     console.log ( result );
	     db.close();
   	});
   });
   */

   /*if (foundSummary) {
   if (summaryMap) {
	console.log ("Waiting to send");
        res.status(202).header({Location: `http://localhost:${port}/stocksummary/${summaryMap}`}).send(summaryMap);
        //res.status(202).header({Location: `http://localhost:${port}/stocksummary/${foundSummary.id}`}).send(foundSummary);
   } else {
       console.log(`Stock Summary not found.`);
       res.status(404).send();
   }
   */
});

//app.use('/img', express.static(path.join(__dirname,'img')));

console.log(`Stock Summary service listening on port ${port}`);
app.listen(port);
