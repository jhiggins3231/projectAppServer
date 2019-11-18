module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Comments
};