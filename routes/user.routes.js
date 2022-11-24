const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const uploader = require('../config/upploader.config')
const { loggedIn, loggedOut, checkRoles } = require('../middleware/route-guard')


router.get('/list', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    User
        .find({ role: 'USER' })
        .select({ email: 1, imageUrl: 1 })
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


router.get('/profile', loggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser._id)
        .populate('favorites')
        .then(userDetails => {
            res.render('user/profile', {
                userDetails,
                notEmpty: userDetails.favorites.length > 0
            })

        })
        .catch(error => next(error))

})

router.get('/profile/:profile_id/edit', loggedIn, (req, res, next) => {

    const { profile_id } = req.params

    User
        .findById(profile_id)
        .then(userUpdate => {
            res.render('user/profile-update', userUpdate)
        })
        .catch(error => next(error))

})

router.post('/profile/:profile_id/edit', loggedIn, uploader.single('imageField'), (req, res, next) => {

    const { profile_id } = req.params
    const { username, email } = req.body
    const { path: imageUrl } = req.file

    User
        .findByIdAndUpdate(profile_id, { username, imageUrl, email })
        .then(() => {
            res.redirect('/user/profile')
        })
        .catch(error => next(error))
})

router.post('/profile/:profile_id/delete', loggedIn, (req, res, next) => {

    const { profile_id } = req.params

    User
        .findByIdAndDelete(profile_id)
        .then(() => {
            res.redirect('/auth/sign-up')
        })
        .catch(err => next(err))

})

router.post('/:news_Id/add-favorites', loggedIn, (req, res, next) => {

    const { news_Id } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { favorites: news_Id } })
        .then(() => {
            res.redirect(`/news/${news_Id}`)
        })
        .catch(err => next(err))
})

router.post('/:news_Id/delete-favorites', loggedIn, (req, res, next) => {

    const { news_Id } = req.params

    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { favorites: news_Id } })
        .then(() => {
            res.redirect(`/news/${news_Id}`)
        })
        .catch(err => next(err))
})






module.exports = router