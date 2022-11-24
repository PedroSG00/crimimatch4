
const { rolesViews } = require('./middleware/route-guard');

require("dotenv").config();

require("./db");

const express = require("express");


const app = express();


require("./config")(app);

require('./config/session.config')(app)

const capitalize = require("./utils/capitalize");
const projectName = "Crimimatch";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use(rolesViews)


require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
