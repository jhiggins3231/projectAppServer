const router = require('express').Router()
const sequelize = require('../db')
const ProjectModel = sequelize.import('../models/projects');

router.get('/test', (req, res) => {
    res.send('This is a response from our project controller')
})


/***********************
    CREATE NEW PROJECT
 ***********************/
router.post('/add', (req, res) => {
    let projectName = req.body.projectName;
    let description = req.body.description;
    let location = req.body.location;
    let owner = req.body.owner;

    ProjectModel
    .create({
        projectName: projectName,
        description: description,
        location: location,
        owner: owner
    })
    .then( (data) => {
        res.json({
            project: data,
            message: 'Project Created'
        })
    })
})

module.exports = router;