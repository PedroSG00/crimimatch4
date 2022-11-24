const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const uploader = require('../config/upploader.config')
const { loggedIn, loggedOut, checkRoles } = require('../middleware/route-guard')



/* GET home page */
router.get('/list', loggedIn, checkRoles('ADMIN'), (req, res, next) => {
    User
        .find({ role: 'USER' })
        .select({ username: 1, email: 1 })
        .then(users => {
            res.render('user/list', { users })
        })
        .catch(error => next(error))
});

router.get('/list/:user_id', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(userDetails => {
            res.render('user/details', userDetails)
        })
        .catch(error => next(error))


})

router.get('/list/:user_id/edit', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/edit', user)
        })
        .catch(error => next(error))


})

router.post('/list/:user_id/edit', loggedIn, checkRoles('ADMIN'), uploader.single('imageField'), (req, res, next) => {

    const { user_id } = req.params
    const { username, email, imageField } = req.body

    User
        .findByIdAndUpdate(user_id, { email, username, imageUrl: req.file.path })
        .then(userDetails => {
            // console.log(userDetails)
            res.redirect(`/user/list/${user_id}`)
        })
        .catch(error => next(error))


})

router.post('/list/:user_id/delete', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => {
            res.redirect('/user/list')
        })
        .catch(err => next(err))

})







module.exports = router;
