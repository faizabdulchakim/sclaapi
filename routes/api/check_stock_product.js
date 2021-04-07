const express = require("express");
const router = express.Router();

router.post("/check_stock",(req,res) =>{
	var product_id_		= req.body.product_id;
    Product.find({id:product_id_})
        .then(prd => {
			if(prd.length>0){
				if(prd[0].publish_status==true){
					Stock.find({product_id:product_id_})
					.then(stock=>{
						var bff =0;
						if(stock != null){
							for(x=0;x<stock.length;x++){
								bff = bff + parseInt(stock[x].quantity_available);
							}
						}
						res.json({'status':1,'stock_detail':{product_id:product_id_,stock_available:bff}});
					})
				}else{
					res.send({'status':0,'msg':'product is not publish yet!'});
				}
			}else{
				res.send({'status':2,'msg':'product_id not found!'});
			}
        })
});

module.exports = router;