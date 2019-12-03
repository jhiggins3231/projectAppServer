module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('projects', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        user_id: { // When a new project is created, the UUID of our user is automatically grabbed and attached here.
            type: DataTypes.UUID, 
            allowNull: false
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        badge: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Projects;
}