"use strict";

const express = require('express'); 
const app = express(); 
const morgan = require('morgan'); 
const blogRouter = require("./blogRouter");

app.use("/blog-posts", blogRouter); 
app.use(morgan('common')); 

app.get("/myname", (req, res) => {
	res.json({name: "Jack"})
}); 

app.get("/", (req, res) => {
	res.send("<p style=\"color: red;\">Here is a p tag</p>")
}); 

let server;

function runServer(){
	return new Promise((resolve, reject) => {
		server = app.listen(process.env.PORT || 8080, () => {
			console.log("Your app is running on port 8080"); 
			resolve(); 
		})
		.on('error', err => {
			reject(err); 
		}); 
	}); 
} 

function closeServer(){
	return new Promise((resolve, reject) => {
		console.log('Closing server');
		server.close(err => {
			if(err){
				reject(err); 
			}
			return; 
		})
		resolve(); 
	}); 
}

if(require.main === module) {
	console.log("Starting in production or development mode");
	runServer().catch(err => console.err(err)); 
}


module.exports = { app, closeServer, runServer }; 