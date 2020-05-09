var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');
var flash = require('express-flash')

router.get(['/', '/cart'], function(req, res){
    if(!req.session.cart)
        req.session.cart = []
    res.render('cart', {data: req.session.cart})
})

router.post('/removeFromCart', function(req, res){
    var id = req.body.id
    req.session.cart.splice(id, 1)
    res.redirect('/cart')
})

router.post('/addToCart', function(req, res){
    var item = req.session.data[req.body.id];
    if(!req.session.cart)
        req.session.cart = []
    if(req.session.cart.find(x => x.id === item.id))
        console.log('Item already added')
    else{
        req.session.data.splice()
        req.session.cart.push(item)
        //console.log(req.session.cart)
    }
    res.redirect('/')
})

router.post('/buyCart', function(req, res){
    var idArray = []
    var cart = req.session.cart
    cart.forEach(element => {
        idArray.push(element.id)
    });
    //console.log(idArray)
    if(idArray.length){
        var checkQuery = "SELECT * FROM products WHERE (id) IN (?)"
        dbConn.query(checkQuery, [idArray], function(err, rows){
            if(rows.length === idArray.length)
            {
                var deleteQuery = 'DELETE FROM products WHERE (id) IN (?)'
                dbConn.query(deleteQuery, [idArray], function(err, result){
                    if(err){
                        console.log("Error at deletion")
                        res.redirect('/cart')
                    }
                    else{
                        req.session.cart = []
                        currCart = []
                        req.flash('purchaseMessage', 'Purchase successful!')
                        res.redirect('/')
                    }
                })
            }
            else{
                req.session.cart = rows
                req.flash('purchaseMessage', 'Some items are unavailable, your cart has been updated!')
                res.redirect('/cart')
            }
        })
    }
    else
        res.redirect('/cart')
   
    
})


module.exports = router
