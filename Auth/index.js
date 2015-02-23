(function (auth) {
    
    
    var hasher = require('./hasher.js');
    var data = require('../data');
    var passport = require('passport');
    var localStrategy = require('passport-local').Strategy;
    
    function verifyUser(user, password, next){
      
        data.getUser(user, function (error, userObj) {
            if (!error) {
                var getHash = hasher.computeHash(password, userObj.salt);
                if (getHash == userObj.passwordHash) {
                    next(null, userObj);
                    return;
                }
                   
            }


            next(null, false, { message: "Invalid Credentials" });

        });
    }
    
    auth.ensureAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect("/login");
        }
    };

    auth.init = function (app) {
        
        passport.use(new localStrategy(verifyUser));
        passport.serializeUser(function (user, next) {
          
            next(null, user.mobile);
        });
        
        passport.deserializeUser(function (key, next) {
            
            data.getUser(key, function (err, user) {
                if (err) {
                    next(null, false, { message: "Failed to retrieve user" });
                }
                else {
                    next(null, user);
                }
            });
        });
        app.use(passport.initialize());
        app.use(passport.session());
        
        app.get("/login", function (req, res) {
            SendNotification();
            res.render("login", { title: "Login to FARM[group]" });
           
        });
        
        app.post("/login", function (req, res,next) {
            
            var authFunction = passport.authenticate("local",function (err, user, info) {
               
                if (err) {
                    next(err);
                }
                else {
                    req.logIn(user, function (err) {
                      
                        if (err) {
                            next(err);
                        }
                        else {
                            res.redirect("/");
                        }
                    });

                }

            });
            authFunction(req, res, next);
        });

        app.get("/register", function (req, res) {

            res.render("register", { title: "Register for free with FARM[group]" });
        });

        app.post("/register", function (req, res) {
      
            
            var salt = hasher.createSalt();
            var hash = hasher.computeHash(req.body.password, salt);
            var user = {
                name: req.body.username,
                mobile: req.body.mobile,
                email: req.body.email,
                passwordHash: hash,
                salt: salt
            };
            data.addUser(user, function (err) {
                if (err) {
                    req.flash("RegistrationError", "Could not create user");
                    res.redirect("/register");
                }
                else {
                    
                    SendNotification(user);
                    res.redirect("/login");
                }
            });
        });

        function SendNotification(user){
            sendMail();
            sendSMS();
        }
        function sendMail(){
            
            var nodemailer = require('nodemailer');
            var smtpTransport = require('nodemailer-smtp-transport');
            var options = {
                            host: 'smtp.zoho.com',
                                port: 465,
                                secure: true,
                                auth: {
                                    user: '',
                                    pass: ''
                                }
            };
            var transporter = nodemailer.createTransport(smtpTransport(options));
            
            transporter.sendMail({
    from: '',
    to: '',
    subject: 'hello world!',
    text: 'Thanks for using farm-commerce.com'
},
    function(error,response){
        if(error){
            console.log(error);
        }
        else
        {
            console.log("message sent successfully"+response.message);
        }
    });





        }
        function sendSMS()
        {
            debugger;
            var smpp = require('smpp');
var session = smpp.connect('', 9500);
session.bind_transceiver({
    system_id: '',
    password: ''
}, function(pdu) {
    if (pdu.command_status == 0) {
        // Successfully bound
        session.submit_sm({
            destination_addr: '',
            short_message: 'Hello!'
        }, function(pdu) {
            if (pdu.command_status == 0) {
                // Message successfully sent
                console.log(pdu.message_id);
            }
        });
    }
});
        }

        function sendSMSTwilio()
        {
            debugger;
            // Twilio Credentials 
            var accountSid = ''; 
            var authToken = ''; 
             
            //require the Twilio module and create a REST client 
            var client = require('twilio')(accountSid, authToken); 
             
            client.messages.create({ 
                to: "", 
                from: "", 
                body: "Welcome to Farm-Commerce.com",   
            }, function(err, message) { 
                console.log(message.sid); 
            });
        }
    };

})(module.exports);