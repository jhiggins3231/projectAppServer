const router = require('express').Router();
const Projects = require('../db').import('../models/projects');

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


router.post('/', (req, res) => {
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


router.get('/:badge', (req, res) => {
    Projects.findAll({ where:  {
        badge: req.params.badge}})
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ error: err}))
})

router.put('/:id', (req, res) => {
   Projects.update(req.body, { where: { id: req.params.id }})
    .then((projects) => res.status(200).json(projects))
    .catch(err => res.json({
        error: err
    }))
})

router.delete('/:id', (req, res) => {
    Projects.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(projects => res.status(200).jsonp(projects))
    .catch(err => res.json({
        error: err
    }))
})

module.exports = router