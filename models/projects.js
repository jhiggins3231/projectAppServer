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
            type: DataTypes.TEXT,
            required: true
        },
        location: {
            type: DataTypes.STRING,
            required: true
        },
        description: {
            type: DataTypes.STRING,
            required: true
        },
        badge: {
            type: DataTypes.STRING,
            required: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        underscored: true
    });
    return Projects;
}