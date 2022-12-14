const express = require('express');
const router = express.Router();
const New = require('../models/New.model')
const Comment = require('../models/Comment.model')
const { loggedIn } = require('../middleware/route-guard')


router.post('/:news_Id', loggedIn, (req, res, next) => {

    const { news_Id } = req.params
    const { text } = req.body

    Comment
        .create({ author: req.session.currentUser._id, text })
        .then((newComment) => {
            return New.findByIdAndUpdate(news_Id, { $push: { comments: newComment._id } })
        })
        .then(res.redirect(`/news/${news_Id}`))
        .catch(err => next(err))
})

router.post('/:news_Id/:comment_Id/delete-comment', loggedIn, (req, res, next) => {


    const { news_Id, comment_Id } = req.params

    Comment
        .findByIdAndDelete(comment_Id)
        .then((deletedComment) => {
            return New.findByIdAndUpdate(news_Id, { $pull: { comments: deletedComment._id } })
        })
        .then(res.redirect(`/news/${news_Id}`))
        .catch(err => next(err))

})


router.get('/:news_Id/:comment_Id/edit-comment', loggedIn, (req, res, next) => {

    const { news_Id, comment_Id } = req.params

    const promises = [
        New.findById(news_Id),
        Comment.findById(comment_Id)
    ]

    Promise
        .all(promises)
        .then(([news, comment]) => {
            res.render('news/edit-comment', { news, comment })
        })
        .catch(err => next(err))
})

router.post('/:news_Id/:comment_Id/edit-comment', loggedIn, (req, res, next) => {

    const { news_Id, comment_Id } = req.params
    const { text } = req.body

    Comment
        .findByIdAndUpdate(comment_Id, { text })
        .then((updatedComment) => {
            return New.findByIdAndUpdate(news_Id, { comment: updatedComment._id })
        })
        .then(res.redirect(`/news/${news_Id}`))
        .catch(err => next(err))

})


module.exports = router;


