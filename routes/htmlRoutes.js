var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {});
  });

  //Load all users
  app.get("/users/:cardNumber", function(req, res) {
    console.log(req.params);
    db.User.findOne({
      where: {
        cardNumber: req.params.cardNumber
      }
    }).then(function(results) {
      res.render("patrons", {
        newUser: results
      });
    });
  });

  app.get("/", function(req, res) {
    db.Books.findAll({}).then(function(results){
      res.render("index", {
        books: results
      })
    })
    
  });

  //Route to load books on Search
  app.get("/books/title/:title/", function(req,res){
    db.Books.findAll({
      where:{
        title:req.params.title
      }
    }).then(function(results){
      res.render("patrons", {
        books: results
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
