const chai = require("chai");
const chaiHttp = require("chai-http");
const {app, runServer, closeServer} = require('../server'); 
const should = chai.should(); 

chai.use(chaiHttp); 



describe("BlogPosts", function(){

    before(function(){
        return runServer(); 
    }); 

    after(function(){
        return closeServer(); 
    })

    it("on POST it returns a javascript object if fed proper parameters", function(){
        
        const newPost = {
            "title": "XXX",
            "content": "xxx"
        }

        return chai.request(app)
            .post('/blog-posts')
            .send(newPost)
            .then(function(res){
                res.should.have.status(200); 
            })
    }); 
}); 