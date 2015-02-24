(function (data) {
    
    var databse = require('./Database.js');
    data.getLocationValues = function (key,locationType, next) {
        
        databse.getdb(function (error, theDb) {
            debugger;
            
            if (error) {
                console.log("Failed to connect Databse" + error);
                next(error, null);
            }
            else {
                if(locationType=='S'){

                    theDb.client.query('SELECT state_id,name from places.state', function(err, result) {
                    if(err) {
                      return console.error('error running query', err);
                    }


                    console.log(result.rows[0].theTime);
                    JSON.stringfy(result.rows);
                    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                    client.end();
                    next(null,result.rows);
                  });

                }   
                else if(locationType=='D'){

                    client.query('SELECT NOW() AS "theTime"', function(err, result) {
                    if(err) {
                      return console.error('error running query', err);
                    }
                    console.log(result.rows[0].theTime);
                    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                    client.end();
                  });

                }     
                else if(locationType=='M'){



                }
                else if(locationType=='V'){

                }
                
            
                                
            }

        });
       
        //next(null, seedData.initialNotes);
    }
    
    

  

})(module.exports);