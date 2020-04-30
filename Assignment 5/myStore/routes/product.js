var express = require('express');
var router = express.Router();
var dbConn  = require('../db_connection');
var savedData
var showProductsQuery = 'SELECT * FROM products'
router.get(['/', '/product'], function(req, res, next) {

    dbConn.query(showProductsQuery, function(err,rows)     {

        if(err) {
            req.flash('error', err);
            savedData = ''
            res.render('product',{data:''});

            //console.log("rows");

        } else {
           // console.log(rows);
            savedData = rows
            res.render('product',{data:rows});
        }
    });
});

// // add a new book
router.post('/addProduct', function(req, res, next) {

    let name = req.body.name;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let errors = false;
    if(name.length === 0 ) {
        errors = true;

        req.flash('error', "Please enter name");
        res.render('product', {
            data:savedData
        })
    }

    // if no error
    if(!errors) {

        var form_data = {
            name: name,
            price: price,
            quantity: quantity
        }

        // insert query
        dbConn.query('INSERT INTO products SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)

                // render to add.ejs
                res.render('product', {
                    data:savedData
                })
            } else {
                req.flash('success', 'Product successfully added');
                res.redirect('/product');
            }
        })
    }
})

// // display edit book page
// router.get('/edit/(:id)', function(req, res, next) {

//     let id = req.params.id;

//     dbConn.query('SELECT * FROM books WHERE id = ' + id, function(err, rows, fields) {
//         if(err) throw err

//         // if user not found
//         if (rows.length <= 0) {
//             req.flash('error', 'Book not found with id = ' + id)
//             res.redirect('/books')
//         }
//         // if book found
//         else {
//             // render to edit.ejs
//             res.render('books/edit', {
//                 title: 'Edit Book',
//                 id: rows[0].id,
//                 name: rows[0].name,
//                 author: rows[0].author
//             })
//         }
//     })
// })

// // update book data
// router.post('/update/:id', function(req, res, next) {

//     let id = req.params.id;
//     let name = req.body.name;
//     let author = req.body.author;
//     let errors = false;

//     if(name.length === 0 || author.length === 0) {
//         errors = true;

//         // set flash message
//         req.flash('error', "Please enter name and author");
//         // render to add.ejs with flash message
//         res.render('books/edit', {
//             id: req.params.id,
//             name: name,
//             author: author
//         })
//     }

//     // if no error
//     if( !errors ) {

//         var form_data = {
//             name: name,
//             author: author
//         }
//         // update query
//         dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 // set flash message
//                 req.flash('error', err)
//                 // render to edit.ejs
//                 res.render('books/edit', {
//                     id: req.params.id,
//                     name: form_data.name,
//                     author: form_data.author
//                 })
//             } else {
//                 req.flash('success', 'Book successfully updated');
//                 res.redirect('/books');
//             }
//         })
//     }
// })

// delete book
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