const express = require('express');
const router = express.Router();
const User = require('../models/User.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', (req, res, next) => {

  User
    .findById(req.session.currentUser._id)
    .then(userDetails => {

    })

})





module.exports = router;
