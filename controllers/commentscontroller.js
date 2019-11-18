const router = require('express').Router()
const Comments = require('../db').import('../models/comments');

router.get('/test', (req, res) => {
    res.send('This is a response from our comments controller')
})

/***************************
    CREATE A NEW COMMENT
****************************/
router.post('/post', (req, res) => {
    let owner = req.user.id;
    let comment = req.body.comment;

    Comments.create({
        owner: owner,
        comment: comment
    })
    .then( (data) => {
        res.json({
            comment: data,
            message: 'Comments created'
        })
    })
});

/****************************** 
    GET ALL COMMENTS BY USER
*******************************/
router.get('/', (req, res) => {
    Comments.findAll({
        where: {
            owner: req.user.id
        }
    })
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({
        error: err
    }))
});

/**********************
    GET ALL COMMENTS
***********************/
router.get('/viewall', (req, res) => {
    Comments.findAll()
    .then( comments => res.status(200).json(comments))
    .catch(err => res.status(err));
});

/********************
    DELETE COMMENTS
*********************/
router.delete('/delete/:id', (req, res) => {
    Comments.destroy({
        where: { id: req.params.id}
    })
    .then( res.status(200).json({
        message: 'Comment Deleted'
    }))
    .catch(err => res.status(err))
});

/*******************
    UPDATE COMMENT
 ********************/
router.put('/edit/:id', (req, res) => {
    let owner = req.user.id;
    let comment = req.params.id

    let newComment = req.body.comment;

    Comments
    .update({
        comment: newComment,
    },
    {where:{owner: owner, id: comment}})
    .then(update => res.status(200).json({
        updated: update,
        message: 'Comment Updated'
    }))
    .catch(err => res.status(err))
});


module.exports = router;