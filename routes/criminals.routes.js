const router = require('express').Router()
const axios = require('axios')

const criminalApi = require('./../services/criminal-api.service')
const Api = new criminalApi()

router.get('/api', (req, res, next) => {

    const { page } = req.query

    fetch(`https://api.fbi.gov/wanted/v1/list?page=${page}`)
        .then(res => res.json())
        .then(responseFromAPI => {
            const arr = responseFromAPI.items
            res.render('criminal/list', { arr })
        })
        .catch(err => console.error('ERROR', err))
})

router.get('/match', (req, res, next) => {
    res.render('criminal/form')
})

router.get('/match/result', (req, res, next) => {

    const { hair, eyes, sex } = req.query

    console.log(`https://api.fbi.gov/wanted?eyes=${eyes}&hair=${hair}&sex=${sex}`)

    fetch(`https://api.fbi.gov/wanted?eyes=${eyes}&hair=${hair}&sex=${sex}`)
        .then(res => res.json())
        .then(responseFromAPI => {

            const index = Math.floor(Math.random() * (responseFromAPI.items.length - 1))
            const criminal = responseFromAPI.items[index]
            console.log(criminal)
            res.render('criminal/result', { criminal })

        })
})


module.exports = router

// { image: criminal.images[0].original }