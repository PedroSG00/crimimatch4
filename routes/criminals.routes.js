const router = require('express').Router()
const axios = require('axios')

const criminalApi = require('./../services/criminal-api.service')
const Api = new criminalApi()

router.get('/api', (req, res, next) => {
    fetch('https://api.fbi.gov/wanted/v1/list')
        .then(res => res.json())
        .then(responseFromAPI => {
            // console.log('RESPONSE', { responseFromAPI })
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

    fetch('https://api.fbi.gov/wanted/v1/list')
        .then(res => res.json())
        .then(responseFromAPI => {
            console.log('RESPONSE-----------------', { responseFromAPI })

            console.log()
            const criminalArr = responseFromAPI.items[0]
            const cleanArr = criminalArr.map(criminal => {
                console.log(criminal)
                return {
                    hair: criminal.hair,
                    eyes: criminal.eyes,
                    sex: criminal.sex
                }
            })
            res.render('criminal/result', cleanArr)
        })
})

// Api
//     .getAllCriminals()
//     .then(response => {
//         const criminalArr = response.data._items[0]
//         const cleanArr = criminalArr.map(criminal => {
//             return {
//                 hair: criminal.hair,
//                 eyes: criminal.eyes,
//                 sex: criminal.sex
//             }
//         })
//     })



module.exports = router