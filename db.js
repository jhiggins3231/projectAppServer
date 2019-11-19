const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {

        console.log('Connected to the database');
    },
    function(err){
        console.log(err);
    }
);

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('./models/user')(sequelize, Sequelize);
db.projects = require('./models/projects')(sequelize, Sequelize);
db.comments = require('./models/comments')(sequelize, Sequelize);

//Relations
db.comments.belongsTo(db.projects);
db.projects.hasMany(db.comments);
db.projects.belongsTo(db.user);
db.user.hasMany(db.projects);

module.exports = db;