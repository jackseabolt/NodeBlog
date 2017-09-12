const uuid = require("uuid"); 

const blogPost = {
	create: function(t, c){
		const item = {
			title: t, 
			content: c,
			id: uuid.v4() 
		}
		console.log(item); 
		this.items[item.id] = item; 
		return item; 
	}

}

function createBlogPost(){
	const storage = Object.create(blogPost); 
	storage.items = {}; 
	return storage; 
}

module.exports = { BlogPost: createBlogPost()}; 