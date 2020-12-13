const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('./../middlewares/auth');     //needed since only admins can make categories

//Controllers
const { create, read, update, remove, list } = require('../controllers/category');

//Routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);       //No middlewares; public 
router.get('/category/:slug', authCheck, adminCheck, read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);


module.exports = router;