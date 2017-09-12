const mocha = require("mocha");
const mochaHttp = require("mocha-http");
const {app, runServer, closeServer} = require('..server'); 
const should = chai.should(); 

chai.user(chaiHttp); 



describe("BlogPosts", function(){

    before(function(){
        return runServer(); 
    }); 

    after(function(){
        return closeServer(); 
    })

    it("on POST it returns a javascript object if fed proper parameters", function(){
        return chai.request(app)
            .get('/blog-posts'
            .then(function(res){
                res.should.have.status(200); 
            })
        )
    }); 
}); 