const router = require('express').Router();
const db = require('../config/db');
const env = require('../config/env');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.get('/test', (req, res) => {
    res.status(200).send('This is a test')
})


/***************************
    CREATE A NEW USER
****************************/
router.post('/signup', (req, res) => {

    const created_at = new Date();
    const newUser = req.body;

    db.users.create({
        username: newUser.username,
        email: newUser.email,
        password: bcrpyt.hashSync(newUser.password, 10),
        created_at: created_at
    })
    .then(
        created = (user) => {
            let token = jwt.sign({id: user.id}, env.JWT_SECRET, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token
            })
            console.log('The error is here')
        },
        error = err => res.send(500, err)
    )
})



/***************************
           LOGIN
****************************/
router.post('/login', (req, res) => {

    const loginUser = req.body.user;


    db.users.findOne({
        where: {
            username: loginUser.username
        }
    })
    .then(user => {
        if(user){
            bcrpyt.compare(loginUser.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({id: user.id}, env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'successfully logged in',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'bad gateway'})
                }
            })
        } else {
            res.status(500).send({error: 'failed to authenticate'})
        }
    }, err => res.status(501).send({error: 'server does not support this functionality'}))
})


/***************************
 GET ALL USERS AND ASSOCIATIONS
****************************/
router.get('/users', (req, res) => {
    db.users.findAll({
        include: [
            {
                model: db.projects,
                include: [
                    {
                        model: db.comments
                    }
                ]
            }
        ]
    }).then(users => {
        const resObj = users.map(user => {

            // tidy up user data
            return Object.assign(
                {},
                {
                    user_id: user.id,
                    username: user.username,
                    projects: user.projects.map(post => {

                        // tidy up post data
                        return Object.assign(
                            {},
                            {
                                post_id: post.id,
                                user_id: post.user_id,
                                projectName: post.projectName,
                                comments: post.comments.map(comment => {

                                    // tidy up comment data
                                    return Object.assign(
                                        {},
                                        {
                                            comment_id: comment.id,
                                            post_id: comment.post_id,
                                            commenter: comment.commenter_username,
                                            commenter_email: comment.commenter_email,
                                            content: comment.content
                                        }
                                    )
                                })
                            }
                        )
                    })
                }
            )
        })
        res.json(resObj)
    })
})

module.exports = router;