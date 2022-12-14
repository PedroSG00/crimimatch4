const router = require('express').Router()
const axios = require('axios')
const criminalApi = require('./../services/criminal-api.service')
const Api = new criminalApi()
const { loggedIn } = require('../middleware/route-guard')

router.get('/api', loggedIn, (req, res, next) => {

    const { page } = req.query

    fetch(`https://api.fbi.gov/wanted/v1/list?page=${page}`)
        .then(res => res.json())
        .then(responseFromAPI => {
            const arr = responseFromAPI.items
            console.log(arr[0])
            res.render('criminal/list', { arr })
        })
        .catch(err => console.error('ERROR', err))
})

router.get('/match', loggedIn, (req, res, next) => {
    res.render('criminal/form')
})

router.get('/match/result', loggedIn, (req, res, next) => {

    const { hair, eyes, sex, race } = req.query

    fetch(`https://api.fbi.gov/wanted?eyes=${eyes}&hair=${hair}&sex=${sex}&race=${race}`)
        .then(res => res.json())
        .then(responseFromAPI => {

            const index = Math.floor(Math.random() * (responseFromAPI.items.length - 1))
            const criminal = responseFromAPI.items[index]
            console.log(criminal)
            res.render('criminal/result', { criminal })
        })
        .catch(err => console.error('ERROR', err))
})

router.get('/api/:title/details', loggedIn, (req, res, next) => {

    const { title } = req.params

    fetch(`https://api.fbi.gov/wanted/v1/list?title=${title}`)
        .then(res => res.json())
        .then(titleFromAPI => {
            const oneTitle = titleFromAPI.items.filter(criminal => criminal.title === title)
            res.render('criminal/details', oneTitle[0])
        })
        .catch(err => console.error('ERROR', err))
})

module.exports = router
