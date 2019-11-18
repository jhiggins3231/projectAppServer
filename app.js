require('dotenv').config();

const express = require('express');
const app = express();

// //Routes
const user = require('./controllers/usercontroller');
const projects = require('./controllers/projectcontroller');
const test = require('./controllers/testcontroller')


const sequelize = require('./db');
sequelize.sync(); /*pass in {force: true} to clear tables */
app.use(require('./middleware/headers'));
app.use(express.json());


// //Endpoints
app.use('/auth', user);
app.use(require('./middleware/validateSession'))
app.use('/projects', projects);
app.use('/test', test)

app.listen(3000, function(){
  console.log('Test Test Test')
});

app.use('/api/test', function(req, res){
  res.send('This is data from the endpoint.');
});