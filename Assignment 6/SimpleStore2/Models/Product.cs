using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimpleStore.Models
{
    public class Product 
    {
        public int id;
        public string name;
        public float price;
        public string description;

        public Product(int _id, string _name, float _price, string _description)
        {
            id = _id;
            if (_name != null)
                name = String.Copy(_name);
            else
                name = "";
            price = _price;
            if (_description != null)
                description = String.Copy(_description);
            else
                description = "xx";
        }
        public string ToString()
        {
            return id + " " + name + " " + price + " " + description;
        }
    }
}