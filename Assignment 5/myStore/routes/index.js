var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');

var showProductsQuery = 'SELECT * FROM products'

router.get(['/'], function(req, res) {
    //console.log(req.sessionID)
    if(!req.session.cart)
        req.session.cart = []
    dbConn.query(showProductsQuery, function(err,rows)     {

        if(err) {
            req.flash('error', err);
            req.session.data = '';
            res.render('index',{data:req.session.data, cart:req.session.cart});
            //console.log("rows");

        } else {
            //console.log(rows);
            req.session.data = rows
             console.log(req.session.cart)
            // console.log(req.session.data)
            res.render('index',{data:req.session.data, cart:req.session.cart});
        }
    });
});

module.exports = router;
