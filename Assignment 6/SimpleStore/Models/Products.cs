using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
namespace SimpleStore.Models
{
    public class Products
    {
        public List<Product> products;
        public Products()
        {
            products = new List<Product>();
            try
            {
                StreamReader r = new StreamReader("D:/VS projects/Visual Studio proj/SimpleStore/App_Data/data.json");
                string json = r.ReadToEnd();
                products = JsonConvert.DeserializeObject<List<Product>>(json);
            } catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
            }
        }
            
        public string ToString()
        {
            string result = "";
            for(int i = 0; i < 10; i++)
            {
                result += products[i].id + " " + products[i].name + "\n";
            }
            return result;
        }

    }
}