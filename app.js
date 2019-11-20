const express = require('express');
    env = require('./config/env');
    db = require('./config/db');
    users = require('./controllers/userscontroller');
    projects = require('./controllers/projectscontroller');
    comments = require('./controllers/commentscontroller');
    validateSession = require('./middleware/validateSession');

const app = express();
const PORT = env.PORT;

app.use(express.json());

app.use('/auth', users);
app.use(validateSession);
app.use('/projects', projects);
app.use('/comments', comments);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log('Express listening on port:', PORT);
  });
});