const express = require("express");
const router = express.Router();
const Product = require("../../models/Products");

router.post("/new_product",(req,res) =>{
	
	var product_id				= req.body.product_id;
	var product_name			= req.body.product_name;
	var product_pubish_status	= req.body.product_pubish_status;
    
	Product.findOne({$or:[{id:product_id},{"name":product_name}]})
        .then(sku => {
            if(sku){
				delete sku["_id"];
				//delete sku.product_detail.__v;
                res.json({'status':0,'msg' : 'data already exist!','product_detail':{id:sku.id,name:sku.name,publish_status:sku.publish_status}})
            }else{
				var newProduct = {
                    id : product_id,
                    name : product_name,
                    publish_status : product_pubish_status
                };
                const addProduct = new Product(newProduct);
				addProduct.save()
				.then(sku => res.json({'status':1,'msg':'data added successfully','product_detail':newProduct}))
				.catch(err => console.log({'status':2,'msg':'error while insert the record!','error_detail':err}))
            }
        })
		
});

module.exports = router;