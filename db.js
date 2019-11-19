const Sequelize = require('sequelize');


const sequelize = new Sequelize('RedBadge', 'postgres', '1qaz!QAZ', {
    host: 'localhost',
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

module.exports = sequelize;