var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient; //MongoClient enables us to connect to the MongoDB server
var assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/cvdadhaba';

MongoClient.connect(url, (err, database) => { //connect method allows us to connect our MongoClient to our MongoDB server

    assert.equal(err,null); //assert will check to see if error is equal to null

    //So now if there has no error occurred means we have properly connected to the server
    console.log('Connected correctly to server');
    var db = database.db('cvdadhaba');
    // const collection = db.collection("dishes"); //the db provides us with various methods that enables us to interact with the server. Here we are trying to access dishes collection within the db
    //Insert operation
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);

                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                database.close();
                            });
                        });
                    });
            });
        });

});


var index = require('./routes/index');
var users = require('./routes/users');
var dishes = require('./routes/dishes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
