const router = require('express').Router()

router.get('/test', (req, res) => {
    res.send('This is a response from our comments controller')
})

module.exports = router;