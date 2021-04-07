var express						= require('express');
var cors 						= require('cors');
var bodyParser					= require('body-parser');
const mongoose 					= require("mongoose");
const db 						= require("./config/keys").mongoURI;
const new_product				= require("./routes/api/new_product");
const new_stock					= require("./routes/api/new_stock");
const check_stock				= require("./routes/api/check_stock_product");
const deducted_stock			= require("./routes/api/deducted_stock");
const sandbox					= require("./routes/api/sandbox");

var app							= express();
var corsOptions = {
	origin: function(origin, callback){
		callback(null, true);
	}
}

mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.all("*",cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(new_product);
app.use(new_stock);
app.use(check_stock);
app.use(deducted_stock);
app.use(sandbox);

app.listen(80,function(){console.log("API SERVER START!")});
//app.listen(process.env.PORT,function(){console.log("API SERVER START!")});
