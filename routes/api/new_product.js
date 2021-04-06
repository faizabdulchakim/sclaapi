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
                res.json({'msg' : 'produk sudah pernah terdaftar sebelumnya!'})
            }else{
                const newProduct = new Product({
                    id : product_id,
                    name : product_name,
                    publish_status : product_pubish_status
                });
				newProduct.save()
				.then(sku => res.json(sku))
				.catch(err => console.log(err))
            }
        })
});

module.exports = router;