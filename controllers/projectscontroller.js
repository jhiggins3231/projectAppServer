const router = require('express').Router();
const db = require('../config/db');

/***************************
    CREATE A NEW PROJECT
****************************/
router.post('/post', (req, res) => {

    console.log(req);

    const created_at = new Date();
    const newProject = req.body;

    db.projects.create({
            user_id: req.user.id,
            projectName: newProject.projectName,
            location: newProject.location,
            description: newProject.description,
            badge: newProject.badge,
            created_at: created_at
        })
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            res.json(err)
        })
});

/********************************************
    VIEW ALL PROJECTS BY BADGE
*********************************************/
router.get('/badge/:badge', (req, res) => {
   db.projects.findAll({ 
       where:  {
       badge: req.params.badge
    }
})
   .then(projects => res.status(200).json(projects))
   .catch(err => res.status(500).json({ error: err}))
})

/********************************************
    VIEW ALL PROJECTS WITH COMMENTS BY USER
*********************************************/
router.get('/view', (req, res) => {
    let owner = req.user.id
    db.projects.findAll({
        include: [
            {
                model: db.comments
            }
        ]
    })
    .then( (projects => {
        res.status(200).json(projects)
    }))
    .catch(err => res.status(err))
});


/***************************
    DELETE PROJECT BY ID
****************************/
router.delete('/remove/:id', (req, res) => {
    db.projects.destroy({
        where: {
            id: req.params.id, 
            user_id: req.user.id
        }
    })
    .then( (data) => {
        res.status(200).json({message: `Deleted: ${data}`})
    })
    .catch(err => res.status(err))
});


/***************************
    EDIT PROJECT BY ID
****************************/
router.put('/edit/:id', (req, res) => {
    let owner = req.user.id;
    let project = req.params.id

    let newProjectName = req.body.projectName;
    let newDescription = req.body.location;
    let newLocation = req.body.description;
    let newBadge = req.body.badge;

    db.projects
    .update({
        projectName: newProjectName,
        description: newDescription,
        location: newLocation,
        badge: newBadge
    },
    {where:{user_id: owner, id: project}})
    .then(update => res.status(200).json({
        updated: update,
        message: 'Project Updated'
    }))
    .catch(err => res.status(err))
});


module.exports = router;