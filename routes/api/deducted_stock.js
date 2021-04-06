const express = require("express");
const router = express.Router();

router.post("/deducted_stock",(req,res) =>{
	var product_id_		= req.body.product_id;
	var qty				= req.body.qty;
	qty					= parseInt(qty);
    Stock.find({product_id:product_id_,quantity_available:{$gt:qty-1}}).sort({date_stock_added:1}).limit(1)
        .then(stock => {
			if(stock.length>0){
				var stock_id_	= stock[0].stock_id;
				var original_	= stock[0].quantity_available;
				original_		= parseInt(original_);
				var new_stock	= original_ - qty;
				var myquery = { quantity_available: new_stock};
				Stock.updateOne({stock_id: stock_id_, quantity_available:new_stock}, function(err, res_){
					console.log(stock_id_);
					console.log("---");
					console.log(original_);
					console.log("----")
					console.log(new_stock);
					res.json({msg:"update berhasil!"})
				});
			}else{
				res.json({msg:"produk tidak ditemukan"})
			}
        })
});

module.exports = router;