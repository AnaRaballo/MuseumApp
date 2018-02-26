const express = require('express');
const Art = require('../models/artwork');
const authRoutes = express.Router();

authRoutes.get('/artworks', (req, res, next) => {
    let artId = req.params.artId;

    Art.findById(productId, (err, artwork) => {
        if (err) {next(err); }
        res.render('artwork/new', {
            artwork: artwork
        });
    });
});

