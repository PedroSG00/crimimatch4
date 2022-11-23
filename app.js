
const User = require('./models/User.model')

require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();


require("./config")(app);

require('./config/session.config')(app)

const capitalize = require("./utils/capitalize");
const projectName = "Crimimatch";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
    if (req.session.currentUser) {
        if (req.session.currentUser.role === 'ADMIN') {
            app.locals.admin = req.session.currentUser.role
        } else {
            app.locals.user = req.session.currentUser.role
        }

    } else {
        app.locals.admin = null
        app.locals.user = null
    }
    next()
})


require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
