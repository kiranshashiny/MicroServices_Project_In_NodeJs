var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  
/*
 dbo.collection("stocks_summary").find().toArray( function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
*/

  // find just one. GTX, ATEN. This is for data inserted using Mongoose.
  const cursor = dbo.collection('stocksummary').find({ Symbol: "WUBA" }).toArray( function ( err, result ) {
     console.log ( result );
     db.close();
  });

/*  // find all , for data inserted using Mongoose.
  cursor = dbo.collection('stocksummary').find({}).toArray( function ( err, result ) {
     console.log ( result );
     db.close();
  });
*/

/*
  // This one gets me just the records that have the word flying.
  const cursor = dbo.collection('powers').find({ name: "flying" }).toArray( function ( err, result ) {
     console.log ( result );
     db.close();
  });

  const cursor = dbo.collection('powers').find({ name: /^[a-z]/ }).toArray( function ( err, result ) {
     console.log ( result );
     //db.close();
  });


  dbo.collection("stocks").find().toArray( function(err, result) {
    if (err) throw err;
    console.log(result);
    //db.close();
  });
*/
/*
  dbo.collection("stocks_summary").find({}).toArray( function(err, result) {
    if (err) throw err;

    console.log(result);
    db.close();
  });
*/
/* 
  console.log ("Now printing the number of elements 'stocks_summary'")
  var query = { displayName:'GTX'};
  dbo.collection("stocks_summary").find({query}).toArray( function(err, result) {
    if (err) throw err;

    console.log(result);
    db.close();
  });
*/ 
/*  dbo.collection("myheroes").find({}).toArray( function(err, result) {
    if (err) throw err;

    console.log(result);
    db.close();
  });
*/

});
