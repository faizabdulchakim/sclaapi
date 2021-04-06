const mongoose = require("mongoose");
const schema = mongoose.Schema;

const StocksSchema = new schema({
	stock_id:{
		type:Number,
		required:true
	},
	product_id:{
		type:Number,
		required:true
	},
	quantity_available:{
		type:Number,
		required:true
	},
	date_stock_added:{
		type:Date,
		default: Date.now
	}
});

module.exports = Stock = mongoose.model("stock",StocksSchema);