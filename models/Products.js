const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema({
	id:{
		type:Number,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	publish_status:{
		type:Boolean,
		required:true
	}
});

module.exports = Product = mongoose.model("sku",ProductSchema);