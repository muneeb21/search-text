const express = require('express');

const router = express.Router();

console.log('router loaded');

const Controller=require('../controllers/controller')

// Routes for insertion and selection of questions
router.post('/insert',Controller.insert);
router.post('/select',Controller.select);

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;