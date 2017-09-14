const express = require("express"); 
const router = express.Router(); 
const bodyParser = require("body-parser"); 
const jsonParser = bodyParser.json(); 
const {BlogPost} = require("./model");
const knex = require("knex")({
	client: 'pg',
	connection: {
		database: 'nodeblog'
	}
});  

router.post("/", jsonParser, (req,res) => {
	const requiredFields = ["title", "content"]; 
	for(let i = 0; i < requiredFields.length; i++){
		field = requiredFields[i]; 
		if(!(field in req.body)){
			const message = `Missing ${field}`; 
			console.error(message); 
			res.send(400).send(message)
		}
	}
	const newData = {
		title: req.body.title, 
		content: req.body.content
	}
	knex('posts')
		.returning(['title', 'content', 'id', 'create_date'])
		.insert(newData)
		.then(response => {
			console.log(response); 
			res.status(201).json(response); 
		})
}); 	

module.exports = router; 