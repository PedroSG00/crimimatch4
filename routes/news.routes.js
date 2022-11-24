const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const New = require('../models/New.model')
const Comments = require('../models/Comment.model')
const { loggedIn, loggedOut, checkRoles } = require('../middleware/route-guard')

router.get('/create', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    res.render('news/create')
});

router.post('/create', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { header, image, body, link } = req.body

    New
        .create({ header, image, body, link })
        .then(() => {
            // console.log(news)
            res.redirect('/news/list')
        })
        .catch(err => next(err))

})

router.get('/list', loggedIn, (req, res, next) => {

    New
        .find()
        .select({ header: 1, image: 1 })
        .then(news => {
            res.render('news/list', { news })
        })
        .catch(err => next(err))

})

router.get('/:id', loggedIn, (req, res, next) => {

    const { id: news_Id } = req.params

    New
        .findById(news_Id)
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
        .then(newsDetails => {
            const role = req.session.currentUser.role
            const userId = req.session.currentUser._id

            const updatedComments = newsDetails.comments.map(comment => {
                userId === comment.author._id.toString() || role === 'ADMIN' ? comment.isUser = true : comment.isUser = false
                return comment
            })

            newsDetails.comments = updatedComments

            res.render('news/details', {
                newsDetails,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                userId
            })
        })
        .catch(err => next(err))
})

router.post('/:id/delete', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { id: news_Id } = req.params

    New
        .findByIdAndDelete(news_Id)
        .then(() => {
            res.redirect('/news/list')
        })
        .catch(err => next(err))

})

router.get('/:id/edit', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { id: news_Id } = req.params

    New
        .findByIdAndUpdate(news_Id)
        .then(newsDetails => {
            res.render('news/edit', newsDetails)
        })
        .catch(err => next(err))
})

router.post('/:id/edit', loggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { header, image, body, link } = req.body
    const { id: news_Id } = req.params

    New
        .findByIdAndUpdate(news_Id, { header, image, body, link })
        .then(() => {
            res.redirect(`/news/${news_Id}`)
        })
        .catch(err => next(err))
})


router.post('/:news_Id/:user_Id/add-favourites', loggedIn, (req, res, next) => {

    const { news_Id, user_Id } = req.params
    // const { header, image, body, link, comments } = req.body
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { favourites: news_Id } })
        .then(favNew => {
            console.log(favNew)
            res.redirect(`/news/${news_Id}`)
        })
        .catch(err => next(err))
})





module.exports = router