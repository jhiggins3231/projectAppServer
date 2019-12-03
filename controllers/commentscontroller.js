const router = require('express').Router();
const db = require('../config/db');


/***************************
    CREATE A NEW COMMENT
****************************/

router.post('/comment', (req, res) => {

    console.log(req);

    const created_at = new Date();
    const newComment = req.body.comment;

    db.comments.create({
            project_id: newComment.project_id,
            content: newComment.content,
            commenter_username: req.user.username,
            created_at: created_at
        })
        .then(comment => {
            res.json(comment);
        });
});

/***************************
    DELETE A COMMENT
****************************/

router.delete('/remove/:id', (req, res) => {
    let owner = req.user.username
    let id = req.params.id

    db.comments.destroy({
        where:{ commenter_username: owner, id: id}
    })
    .then(res.status(200).json({message: 'Deleted'}))
    .catch(err => res.status(err))
})

/***************************
    EDIT A COMMENT
****************************/

router.put('/edit/:id', (req, res) => {
    let owner = req.user.username;
    let id = req.params.id;

    db.comments.update({
        content: req.body.newComment
    },
    {where:{commenter_username: owner, id: id}})
    .then( (update) => {
        res.status(200).json({
            message: 'The comment was updated!',
            update: update
    })})
    .catch(err => res.status(err))
})

/**********************************
    GET ALL COMMENTS FOR ONE USER
***********************************/

router.get('/view', (req, res) => {
    let owner = req.user.username

    db.comments.findAll({
        where: {commenter_username: owner}
    })
    .then( (comments => {
        res.status(200).json({comments: comments})
    }))
    .catch(err => res.status(err))
});
/***************************
    GET ALL COMMENTS FOR ONE PROJECT
****************************/

router.get('/view/:id', (req, res) => {
    let owner = req.user.username;
    let project = req.params.id;

    db.comments.findAll({
        where: {
            project_id: project
        }
    })
    .then( (comments) => {
        res.status(200).json({comments: comments})
    })
    .catch(err => res.status(err))
})

/**************************
    ADMIN REMOVE COMMENT
***************************/

router.delete('/adminremove/:id', (req, res) => {
    db.comments.destroy({
        where: {
            id: req.params.id,
        }
    })
    .then( (data) => {
        res.status(200).json({message: `Deleted: ${data}`})
    })
    .catch(err => res.status(err))
});


module.exports = router;