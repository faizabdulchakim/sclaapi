const express = require("express");
const router = express.Router();

router.post("/check_stock",(req,res) =>{
	var product_id_		= req.body.product_id;
    Stock.find({product_id:product_id_})
        .then(stock => {
			var bff =0;
			if(stock == null){
				bff =0;
			}else{
				for(x=0;x<stock.length;x++){
					bff = bff + parseInt(stock[x].quantity_available);
				}
			}
            res.json({product_id:product_id_,stock_available:bff})
        })
});

module.exports = router;