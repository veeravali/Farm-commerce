(function (homeController) {
    var data = require("../data")
    homeController.init = function (app) {
        
        app.get("/", function (request, response) {
      
            data.getNotesCategories(function (err, results) {
                
                response.render("index2", { title: "The Board", error: err, catogeries: results , user:request.user });

            })
            

        });

        app.post("/createCategory", function (request, response) {
            debugger;
            var catName = request.body.categoryName;

        });

    };

})(module.exports);