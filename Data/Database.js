(function (database) {
    
    var mongoDb = require('mongodb');
    var mongoUrl = "mongodb://localhost:27017/theBoard";
    var theDb = null;
    database.getdb = function (next) {
        
        if (!theDb) {
            mongoDb.MongoClient.connect(mongoUrl, function (error, db) {
               
               if (error) {
                    next(error, null);
                }
                else {
                    theDb= {
                        db:db,
                        notes: db.collection("notes"),
                        users: db.collection("users")  
                    };
                    next(null, theDb);
                }

            });
        }
        else {
            next(null, theDb);
        }
    };

})(module.exports);