const express = require("express"); 
const router = express.Router(); 
const bodyParser = require("body-parser"); 
const jsonParser = bodyParser.json(); 
const {BlogPost} = require("./model"); 

router.post("/", jsonParser, (req,res) => {
	const requiredFields = ["title", "content"]; 
	console.log("IT GOT TO HERE")
	for(let i = 0; i < requiredFields.length; i++){
		field = requiredFields[i]; 
		if(!(field in req.body)){
			const message = `Missing ${field}`; 
			console.error(message); 
			res.send(400).send(message)
		}
	}
	console.log(req.body.title); 
	const item = BlogPost.create(req.body.title, req.body.content); 
	res.json(item); 
}); 	

module.exports = router; 