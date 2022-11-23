const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const uploader = require('../config/upploader.config')
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
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
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



router.get('/profile', (req, res, next) => {

    User
        .findById(req.session.currentUser._id)
        .then(user => {
            res.send('fvk')
        })

})







module.exports = router;
