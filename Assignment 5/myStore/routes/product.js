var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');
var showProductsQuery = 'SELECT * FROM products'
router.get(['/', '/product', '/cart'], function(req, res) {

    dbConn.query(showProductsQuery, function(err,rows)     {
        if(err) {
            req.flash('error', err);
            req.session.data = ''
            res.render('product',{data:  req.session.data});

            //console.log("rows");

        } else {
            req.session.data = rows
           // console.log(req.session.data);
            res.render('product',{data:  req.session.data});
        }
    });
});

// // add a new book
router.post('/addProduct', function(req, res) {

    let name = req.body.name;
    let price = req.body.price;
    //let quantity = req.body.quantity;
    let errors = false;
    if(name.length === 0 ) {
        errors = true;

        req.flash('error', "Please enter name");
        res.render('product', {
            data:req.session.data
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            price: price,
            //quantity: quantity
        }

        // insert query
        dbConn.query('INSERT INTO products SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('product', {
                    data:req.session.data
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/product');
            }
        })
    }
})

router.get('/deleteProduct/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('DELETE FROM products WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            console.log(err)
            // redirect to books page
            res.redirect('/product')
        } else {
            // set flash message
            req.flash('success', 'Product successfully deleted! ID = ' + id)
            // redirect to books page
            res.redirect('/product')
        }
    })
})

module.exports = router;