(function (database) {

    var pg = require('pg');

var conString = "postgres://postgres:pn121035@PG@localhost:5432/IndiaRTI";

    
    var theDb = null;
    database.getdb = function (next) {
        
        
        if (!theDb) {


            var client = new pg.Client(conString);
            client.connect(function(err,db) {
                
              if(err) {
                next(err,null);
              }
              else{
                theDb={
                    client:db
                }
                next(null,theDb);
              }
             
            });
                       
        }
        else {
            next(null, theDb);
        }
    };

})(module.exports);