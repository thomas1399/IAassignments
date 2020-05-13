using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SimpleStore.Models;

namespace SimpleStore.Controllers
{
    public class ShoppingCartController : Controller
    {
        // GET: ShoppingCart
        public ActionResult ShoppingCartIndex()
        {
            ShoppingCart cart = new ShoppingCart();
            if(Session["cart"] != null)
                cart = (ShoppingCart)Session["cart"];
            System.Diagnostics.Debug.WriteLine(cart.ToString());
            return View(cart);
        }

        [HttpPost]
        public ActionResult removeFromCart(int id)
        {
            ShoppingCart cart = (ShoppingCart)Session["cart"];
            cart.removeFromCart(id);
           // System.Diagnostics.Debug.WriteLine(cart.ToString());
            Session["cart"] = cart;
            return RedirectToAction("ShoppingCartIndex");
        }

        [HttpPost]
        public ActionResult finishPurchase()
        {
            Products prod = (Products)Session["products"];
            ShoppingCart cart = (ShoppingCart)Session["cart"];
            foreach(Product p in cart.cart)
            {
                var index = prod.products.IndexOf(prod.products.Find(x => x.id == p.id));
                prod.products.RemoveAt(index);
            }
            //System.Diagnostics.Debug.WriteLine(cart.ToString());
            //System.Diagnostics.Debug.WriteLine(prod.ToString());
            Session["cart"] = new ShoppingCart();
            Session["products"] = prod;
            TempData["message"] = "Purchase successful!";
            return RedirectToAction("ProductsIndex", "Products", new { area = "" });
        }
    }
}