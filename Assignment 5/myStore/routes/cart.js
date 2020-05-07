var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');
var currCart = []

router.get(['/', '/cart'], function(req, res){
    if(req.session.cart)
        res.render('cart', {data: req.session.cart})
    else
        res.render('cart', {data: ""})
})
// function removeFromCart(id){ 
//     console.log('clicked')
//     currCart.splice(id, 1)
//     req.session.cart = currCart
//     res.redirect('/cart')
// }
router.post('/removeFromCart', function(req, res){
    var id = req.body.id
    currCart.splice(id, 1)
    req.session.cart = currCart
    res.redirect('/cart')
})

router.post('/addToCart', function(req, res){
    var item = req.session.data[req.body.id];
    if(currCart.find(x => x.id === item.id))
        console.log('Item already added')
    else{
        currCart.push(item)
        req.session.cart = currCart
        console.log(req.session.cart)
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
                        console.log(err)
                        res.redirect('/cart')
                    }
                    else{
                        console.log("Succesful purchase")
                        req.session.cart = []
                        currCart = []
                        res.redirect('/')
                    }
                })
            }
            else{
                console.log("Some items are missing")
                req.session.cart = rows
                res.redirect('cart')
            }
        })
    }
    else
        res.redirect('cart')
   
    
})


module.exports = router
