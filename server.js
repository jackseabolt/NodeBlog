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

app.listen( process.env.PORT || 8080, () => { console.log("The app is listening on port 8080") });