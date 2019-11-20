const jwt = require('jsonwebtoken'); // Importing our jwt dependency
const db = require('../config/db'); // Import our db object
const env = require('../config/env') // Importing our env object

const validateSession = (req, res, next) => { // Declaring a new funcion, validateSession
    if(req.method == 'OPTIONS') { // using an if statement to check if the request method is 'OPTIONS'
        next(); // If it is, move to the next step
    } else { // if it's not
        const token = req.headers.authorization // Declaring a new variable and setting it to the value stored in the requests authorization header
        jwt.verify(token, env.JWT_SECRET, (err, decodedToken) => { // Using jwt.verify() to check the token against our secret returning either 'err' or 'decodedToken'
            if (!err && decodedToken) { // using an if statement to check that there is not an error AND there is a decodedToken
                db.users.findOne({ // digging into our db object to find a specific user in our users table
                        where: { // Telling the findOne() method where to look, keep in mind that where is always an object itself
                            id: decodedToken.id // looking for a match between id and the decodedToken.id in our users table
                        }
                    }, console.log(decodedToken)) // console.logs the token
                    .then(user => { // using a .then() promise resolver
                        if (!user) throw 'err' // If there is no user, throw an error, any other promises will not execute until we reach our .catch
                        req.user = user // A second measure to ensure that the requesting user matches the user in our db
                        return next() // returns our user and moves to the next step
                    })
                    .catch(err => next(err)) // handling any errors that may occur in our promise
            } else { // if the initial if statement (if (!err && decodedToken)) fails, do this
                req.errors = err // Set the errors in our request to our err variable
                return res.status(500).send(res.json({ // The server responds with an error status and a json object containing our error
                    err: err
                }));
            }
        })
    }
}

module.exports = validateSession; // exports the module for use in other files