const env = require('./env'); // Importing our env object

const Sequelize = require('sequelize'); // Declaring a new variable and using it to hold our sequelize dependency
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, { // Declaring a new variable that will connect and interact with our database
    dialect: env.DATABASE_DIALECT
})

sequelize.authenticate() // Using .authenticate() to test our connection
    .then(() => console.log('postgres db is connected')) // If we console.log the string
    .catch(err => console.log(err)); // If we run into an error, console.log(the error)

// Connect all the models/tables in the database to a db object,
// so everything is accessible via one object
const db = {}; // Creating an empty db object

db.Sequelize = Sequelize; // using . notation to add a key/value pair to our db object
db.sequelize = sequelize; // using . notation to add a key/value pair to our db object

//Models/tables
db.users = require('../models/user')(sequelize, Sequelize); // adding the users model/table to the db object
db.projects = require('../models/projects')(sequelize, Sequelize); // adding the projects model/table to the db object
db.comments = require('../models/comments')(sequelize, Sequelize); // adding the comments model/table to the db object

//Relations
db.comments.belongsTo(db.projects, {constraints: false});
db.projects.hasMany(db.comments, {constraints: false});
db.projects.belongsTo(db.users);
db.users.hasMany(db.projects);

module.exports = db; // exporting the db for use in other files

/*
    LINES 25-28 BREAKDOWN
        - Using belongsTo and hasMany to create relationships between our tables.

        - EXAMPLE: ( db.comments.belongsTo(db.projects) )
            - db.comments refers to the comments table in our database
            - belongsTo() creates an assocation between the 'source' (db.comments) and target we pass in
            - belongsTo(db.projects) passing in our projects table as the target of our belongsTo()
            - In our comments model, we are looking for a project_id
            - Because are comments table has a relationship with our projects table, we are able to dig into the table and assign our project_id to our comments table
            - In our projects model, the id is a UUID meaning that each project id can exist only ONCE in that table
            - Since project_id is NOT a UUID in our comments table, the same project_id can exist multiple times in the table allowing many comments to be assocaited with one project
        
        - EXAMPLE: ( db.projects.hasMany() )
            - db.projects refers to the projects table in our database
            - hasMany() creates an association between the 'source; (db.projects) and the target we pass in
            - hasMany(db.comments) passing in our comments table as the target of hasMany()
            - Each comment in our comments table is associated with a speicific project, hasMany() tells the db that each project can have multiple comments associated with its id
            - Because we tell the db that projects can have many comments, when interacting with our projects table (such as "GET"ing information, we can dig in further and find comments asoociated with its id)
*/