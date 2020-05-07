var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');

var showProductsQuery = 'SELECT * FROM products'

router.get(['/'], function(req, res) {
    console.log(req.sessionID)
    dbConn.query(showProductsQuery, function(err,rows)     {

        if(err) {
            req.flash('error', err);
            req.session.data = ''
            res.render('index',{data:req.session.data});
            //console.log("rows");

        } else {
            //console.log(rows);
            req.session.data = rows
            res.render('index',{data:req.session.data});
        }
    });
});

module.exports = router;
