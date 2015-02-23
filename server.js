var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var auth = require("./Auth/index.js");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var session=require("express-session")
var controllers = require('./Controllers/Index.js');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret : "formgroup" }));
app.use(flash());


//app.use(express.urlencoded());

app.set("view engine", "vash");
auth.init(app);




controllers.init(app);



var server = http.createServer(app);

server.listen("3000");