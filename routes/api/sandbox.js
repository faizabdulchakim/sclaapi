const express	= require("express");
const router	= express.Router();

router.get("/sandbox",(req,res) =>{
	
	res.sendFile(__dirname+"/sandbox.html");
		
});

module.exports = router;