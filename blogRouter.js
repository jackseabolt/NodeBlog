
const express = require("express"); 
const router = express.Router(); 
const bodyParser = require("body-parser"); 
const jsonParser = bodyParser.json(); 
const knex = require("knex")({
	client: 'pg',
	connection: {
		database: 'nodeblog'
	}
});  


// POST inserts a post
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

// GET returns all posts
router.get("/", (req, res) => {
	knex
		.select('title', 'content', 'id', 'create_date')
		.from('posts')
		.then(response => {
			console.log(response); 
			res.status(200).json(response); 
		}); 
}); 

// GET returns single post
router.get("/:id", (req, res) => {
	knex
		.select('title', 'content', 'id', 'create_date')
		.from('posts')
		.where({ id: req.params.id })
		.then(response => {
			res.status(200).json(response);
		}); 
});

// PUT updates single post 
router.put("/:id", jsonParser, (req, res) => {
	newData = {
		title: req.body.title, 
		content: req.body.content
	}
	knex("posts")
		.where({ id: req.params.id })
		.update(newData)
		.then(response => {
			console.log(response); 
			res.status(204).json(response)
		});
}); 

// DELETE removes single post
router.delete("/:id", (req, res) => {
	knex("posts")
		.where({ id: req.params.id })
		.del()
		.then(response => {
			console.log(response); 
			res.status(202).json(response); 
		})
}); 

module.exports = router; 