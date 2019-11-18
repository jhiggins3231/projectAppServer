const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to DB')
    },
    function(err){
        console.log(err);
    }
)

module.exports = sequelize;
