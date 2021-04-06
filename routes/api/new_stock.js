const express = require("express");
const router = express.Router();
const Stock = require("../../models/Stocks");

router.post("/new_stock",(req,res) =>{
	var stock_id				= req.body.stock_id;
	var product_id				= req.body.product_id;
	var quantity_available		= req.body.quantity_available;
    Stock.findOne({stock_id:stock_id})
        .then(stock => {
            if(stock){
                res.json({'msg' : 'stock id sudah pernah ada!'})
            }else{
                const newStock = new Stock({
                    stock_id : stock_id,
                    product_id : product_id,
                    quantity_available : quantity_available
                });
				newStock.save()
				.then(stock => res.json(stock))
				.catch(err => console.log(err))
            }
        })
});

module.exports = router;