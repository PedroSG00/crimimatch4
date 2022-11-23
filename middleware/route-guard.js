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


module.exports = {
    loggedIn,
    loggedOut,
    checkRoles,
}


