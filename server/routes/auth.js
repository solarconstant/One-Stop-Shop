const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('./../middlewares/auth');

//Controllers
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

//Routes
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);    //To check for admin   

module.exports = router;