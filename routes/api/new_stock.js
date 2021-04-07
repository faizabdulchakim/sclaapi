const express	= require("express");
const router	= express.Router();
const Stock		= require("../../models/Stocks");
const LogStock	= require("../../models/LogStock");

router.post("/new_stock",(req,res) =>{
	
	var stock_id				= req.body.stock_id;
	var product_id				= req.body.product_id;
	var quantity_available		= req.body.quantity_available;
    
	Stock.findOne({stock_id:stock_id})
        .then(stock => {
            if(stock){
                res.json({'status':0,'msg' : 'stock id already exist','stock_detail':{stock_id:stock.stock_id,quantity_available:stock.quantity_available,date_stock_added:stock.date_stock_added}})
            }else{
                const newStock = {
                    stock_id : stock_id,
                    product_id : product_id,
                    quantity_available : quantity_available
                };
				const addStock = new Stock(newStock);
				addStock.save()
				//.then(stock => res.json({'status':1,'msg':'data added successfully','stock_detail':newStock}))
				.then(function(stock){
					
					const logstock = new LogStock({
						product_id:product_id,
						stock_id:stock_id,
						qty_in:quantity_available,
						qty_out:0
					});
					logstock.save()
					.then(logstock_=>res.json({'status':1,'msg':'data added successfully','stock_detail':newStock}))
					
					
				})
				.catch(err => console.log({'status':2,'msg':'error while insert the record!','error_detail':err}))
            }
        })
		
});

module.exports = router;