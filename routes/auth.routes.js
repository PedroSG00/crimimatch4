const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const uploader = require('../config/upploader.config')
const { loggedIn, loggedOut, checkRoles } = require('../middleware/route-guard')
const { default: mongoose } = require('mongoose')

const saltRounds = 10


router.get('/sign-up', (req, res, next) => {
    res.render('auth/sign-up')
});

router.post('/sign-up', uploader.single('imageField'), (req, res, next) => {

    const { password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword, imageUrl: req.file.path }))
        .then(() => res.redirect('/'))
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                let errorMessage = ''
                Object.entries(error.errors).forEach(elm => errorMessage += `${elm[1].message}<br>`)
                res.render('auth/sign-up', { errorMessage })
            } else {
                next(error)
            }
        })
})

router.get('/log-in', (req, res, next) => {
    res.render('auth/log-in')
})

router.post('/log-in', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/log-in', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/log-in', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


router.post('/log-out', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/log-in')
    })
})


module.exports = router;