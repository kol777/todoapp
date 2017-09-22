// dummy data
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'get bread'}];

var mongoose = require('mongoose');
// mlab.com

// connect to the database
mongoose.connect('mongodb://test:test@ds143744.mlab.com:43744/todos');

// create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

// create a Model of the Schema
var Todo = mongoose.model('Todo', todoSchema);

// adding manual item for test
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
  // setting routes
  app.get('/todo', function(req, res){
    // get data from mongodb and pass it to the view
    // Todo.find({item: 'buy flowers'}); // finding a specific item
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    }); // getting all items from the Todo collection
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
