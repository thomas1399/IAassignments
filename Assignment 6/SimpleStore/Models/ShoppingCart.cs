using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleStore.Models
{
    public class ShoppingCart
    {
        public List<Product> cart;
        public ShoppingCart()
        {
            cart = new List<Product>();
        }

        public void addToCart(Product prop)
        {
            cart.Add(prop);
        }

        public void removeFromCart(int id)
        {
            Product toDelete = cart.Find(x => x.id == id);
            if(toDelete != null)
                cart.Remove(toDelete);
        }

        public float totalSum()
        {
            float sum = 0;
            foreach(Product p in cart)
            {
                sum += p.price;
            }
            return sum;
        }

        public string ToString()
        {
            string result = "";
            foreach(Product p in cart)
            {
                result += p.id + " " + p.name + " " + p.price + " " + p.description;
                result += "\n";
            }
            return result;
        }
    }
}