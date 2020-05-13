using SimpleStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SimpleStore.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        public ActionResult ProductsIndex()
        {
            if(Session["products"] == null)
            {
                var products = new Products();
                Session["products"] = products;
            }
            
            if (Session["cart"] == null)
                Session["cart"] = new ShoppingCart();
            return View();
        }

        [HttpPost]
        public ActionResult addToCart(int id, string name, float price, string description)
        {
            Product p = new Product(id, name, price, description);
            //System.Diagnostics.Debug.WriteLine(p.ToString());
            if (Session["cart"] == null){
                ShoppingCart cart = new ShoppingCart();
                cart.addToCart(p);
                Session["cart"] = cart;
                System.Diagnostics.Debug.WriteLine(cart.ToString());
                return RedirectToAction("ProductsIndex");
            }
            else
            {
                ShoppingCart cart = (ShoppingCart)Session["cart"];
                if (cart.cart.Find(x => x.id == p.id) == null)
                {
                    cart.addToCart(p);
                    Session["cart"] = cart;
                    System.Diagnostics.Debug.WriteLine(cart.ToString());
                }
                else
                    System.Diagnostics.Debug.WriteLine("Item already added");
                return RedirectToAction("ProductsIndex");
            }
        }

        [HttpPost]
        public ActionResult removeFromCart(int id)
        {
            ShoppingCart cart = (ShoppingCart)Session["cart"];
            cart.removeFromCart(id);
            System.Diagnostics.Debug.WriteLine(cart.ToString());
            Session["cart"] = cart;
            return RedirectToAction("ProductsIndex");
        }
    }
}