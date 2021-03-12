const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('./../middlewares/auth');     //needed since only admins can make categories

//Controllers
const { create, read, update, remove, list, getSubs } = require('../controllers/category');

//Routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);       //No middlewares; public 
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/subcategories/:_id', getSubs);


module.exports = router;