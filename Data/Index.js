(function (data) {
    var seedData = require('./seedData.js');
    var databse = require('./Database.js');
    data.getNotesCategories = function (next) {
        
        databse.getdb(function (error, theDb) {
            
            if (error) {
                console.log("Failed to connect Databse" + error);
                next(error, null);
            }
            else {
                theDb.notes.find().toArray(function (err, results) {
                  
                    if (err) {
                        next(error, null);
                    }
                    else {
                        next(null, results);
                    }
                });
            }

        });
       
        //next(null, seedData.initialNotes);
    }
    
    data.addUser = function (user, next) {

        
        databse.getdb(function (error, theDb) {
           
            if (error) {
                next(error, null);
            }
            else {
               
                theDb.users.insert(user, next);
            }
        });

    };
    
    data.getUser = function (user, next){
        databse.getdb(function (error, theDb) {
           
            if (error) {
                next(error, null);
            }
            else {
                theDb.users.findOne({ mobile: user },next);
            }
        });
    }

    function seedatabase(){

       
        databse.getdb(function (error, theDb) {
         
            if (error) {

                console.log("Failed to connect Databse" + error);
            }
            else {
                theDb.notes.count(function (error, count){
                   
                    if (error) {
                        console.log("Failed to read Notes" + error);
                        
                    }
                    else {
                       
                        if (count == 0) {
                            console.log("Databse is seeding....")
                            seedData.initialNotes.forEach(function (item) {
                                theDb.notes.insert(item, function (error) {
                                    if (error) {
                                        console.log("Failed to insert Data");
                                    }
                                });
                            });
                        }
                        else {
                            console.log("Databse is already seeded!")
                        }
                    }
                })
            }
        });
    }

    seedatabase();

  

})(module.exports);