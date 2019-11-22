/*
  - Lines (4-10): Declaring a variable and storing the imports of our, express dependency, env file, db file, validateSession file and controller files
*/
const express = require('express');
    env = require('./config/env');
    db = require('./config/db');
    users = require('./controllers/userscontroller');
    projects = require('./controllers/projectscontroller');
    comments = require('./controllers/commentscontroller');
    validateSession = require('./middleware/validateSession');

const app = express(); // Declaring a variable and setting its value to allows us access to express application methods
app.use(require('./middleware/headers')) // Recquiring headers to be sent with requests to the server, controlling who can interact with the server and how
const PORT = env.PORT; // Declaring a variable and setting its value to the PORT value stored in our env object using dot notation

app.use(express.json()); // Giving all routes underneath access to the express json() method, allowing us to parse json data

app.use('/auth', users); // Route leading to our userscontroller and the endpoints within
app.use(validateSession); // Any routes stored below must pass through our sessionValidation before they can be accessed
app.use('/projects', projects); // Route leading to our projectscontroller and the endpoints within
app.use('/comments', comments); // Route leading to our commentscontroller and the endpoints within

db.sequelize.sync().then(() => { 
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
  });
});

/*
  - db is our database object, we created this in our config/db.js file and imported it at the top of this module
  - db.sequelize.sync() breakdown: Using . notation we dig into our db object and grab the value of sequelize, which creates a new sql table.
  - .sync() is a sequelize method that syncs all defined models to our database
  - Using a .then() promise resolver to fire a function after our database syncs
  - Using app.listen, an express method that listens for connections, and passing our PORT variable to tell it where to listen
  - If we connect to the PORT variable (in this case port 3000) console.log a response
*/
