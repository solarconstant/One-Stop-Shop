const express = require('express');
const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require('./../middlewares/auth');     //needed since only admins can make categories

//Controllers
const { create, read, update, remove, list } = require('../controllers/subcategory');

//Routes
router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategories', list);       //No middlewares; public 
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);


module.exports = router;