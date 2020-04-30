var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');

var showProductsQuery = 'SELECT * FROM products'

router.get('/', function(req, res, next) {

    dbConn.query(showProductsQuery, function(err,rows)     {

        if(err) {
            req.flash('error', err);
            res.render('index',{data:''});
            //console.log("rows");

        } else {
            console.log(rows);
            res.render('index',{data:rows});
        }
    });
});

module.exports = router;
