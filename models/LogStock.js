const mongoose = require("mongoose");
const schema = mongoose.Schema;

const LogStockSchema = new schema({
	date_time:{
		type:Date,
		default: Date.now
	},
	product_id:{
		type:Number,
		required:true
	},
	stock_id:{
		type:Number,
		required:true
	},
	qty_in:{
		type:Number,
		required:true
	},
	qty_out:{
		type:Number,
		required:true
	}
});

module.exports = LogStock = mongoose.model("logstock",LogStockSchema);