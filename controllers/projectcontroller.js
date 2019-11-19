const router = require('express').Router();
const Projects = require('../db').import('../models/projects');

/*****************************
    GET ALL PROJECTS BY USER
 *****************************/

router.get('/', (req, res) => {
    Projects.findAll({
        where: {
            owner: req.user.id
        }
    })
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({
        error: err
    }))
})

/*****************************
    CREATE A NEW PROJECT
 *****************************/

router.post('/add', (req, res) => {
    const projectsFromRequest = {
        projectName: req.body.projectName,
        description: req.body.description,
        location: req.body.location,
        badge: req.body.badge,
        owner: req.user.id
    }
    Projects.create(projectsFromRequest)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.json({
        error: err
    }));
})

/*****************************
    GET ALL PROJECTS BY BADGE
 *****************************/

router.get('/find/:badge', (req, res) => {
    Projects.findAll({ where:  {
        badge: req.params.badge,
        owner: req.user.id}})
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err}))
});


/*****************************
    EDIT PROJECT BY ID
 *****************************/

router.put('/edit/:id', (req, res) => {
    let owner = req.user.id;
    let project = req.params.id

    let newProjectName = req.body.projectName;
    let newDescription = req.body.description;
    let newLocation = req.body.location;
    let newBadge = req.body.badge;

    Projects
    .update({
        projectName: newProjectName,
        description: newDescription,
        location: newLocation,
        badge: newBadge
    },
    {where:{owner: owner, id: project}})
    .then(update => res.status(200).json({
        updated: update,
        message: 'Project Updated'
    }))
    .catch(err => res.status(err))
});


/*****************************
    DELETE PROJECT BY ID
 *****************************/

router.delete('/remove/:id', (req, res) => {
    Projects.destroy({
        where: { id: req.params.id}
    })
    .then( res.status(200).json({
        message: 'Project Deleted'
    }))
    .catch(err => res.status(err))
});

module.exports = router