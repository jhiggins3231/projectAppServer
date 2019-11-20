const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    dialect: env.DATABASE_DIALECT
})

sequelize.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/user')(sequelize, Sequelize);
db.projects = require('../models/projects')(sequelize, Sequelize);
db.comments = require('../models/comments')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.projects);
db.projects.hasMany(db.comments);
db.projects.belongsTo(db.users);
db.users.hasMany(db.projects);

// console.log(db);

module.exports = db;