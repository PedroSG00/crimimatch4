function loggedIn(req, res, next) {
    req.session.currentUser ? next() : res.render('auth/log-in', { errorMessage: 'You need to be logged in.' })
}

function loggedOut(req, res, next) {
    !req.session.currentUser ? next() : res.redirect('/')
}

const checkRoles = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/log-in', { errorMessage: `You don't have ${rolesToCheck} permissions` })
    }
}

const rolesViews = ((req, res, next) => {
    if (req.session.currentUser) {
        if (req.session.currentUser.role === 'ADMIN') {
            req.app.locals.admin = req.session.currentUser.role
        } else {
            req.app.locals.user = req.session.currentUser.role
        }

    } else {
        req.app.locals.admin = null
        req.app.locals.user = null
    }
    next()
})




module.exports = {
    loggedIn,
    loggedOut,
    checkRoles,
    rolesViews,
}


