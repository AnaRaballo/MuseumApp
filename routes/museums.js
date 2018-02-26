const express = require('express');
const router = express.Router();

const Museum = require('../models/museum');

router.get('/museums', function(req, res, next){
    Museum.find({}, (err, museumArray) => {
        if (err) {return next(err); }
    res.render('musuems/index', {
        
    })

    
    })
})