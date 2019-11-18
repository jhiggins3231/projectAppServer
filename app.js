require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');


sequelize.sync();

app.use(express.json());

const user = require('./controllers/usercontroller');
const project = require('./controllers/projectcontroller');
const comment = require('./controllers/commentscontroller');

app.listen(3000, function(){
  console.log('App is listening on 3000.')
});

app.use('/test', (req, res) => {
  res.send('This is working')
})

app.use('/user', user)

app.use('/project', project)
app.use(require('./middleware/headers'))

app.use('/comment', comment)