require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

// //Routes
const user = require('./controllers/usercontroller');
const projects = require('./controllers/projectcontroller');
const test = require('./controllers/testcontroller');
const comments = require('./controllers/commentscontroller');


sequelize.sync();
app.use(express.json());


// //Endpoints
app.use('/auth', user);
app.use(require('./middleware/validateSession'))

// Protected Endpoints //

app.use('/projects', projects);
app.use('/comments', comments)
app.use('/test', test);

app.listen(3000, function(){
  console.log('Test Test Test')
});

app.use('/api/test', function(req, res){
  res.send('This is data from the endpoint.');
});