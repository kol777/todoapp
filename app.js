var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine -> view
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// using controller
todoController(app);

// listen to a port
app.listen(3000);
console.log('Listening to port 3000...');
