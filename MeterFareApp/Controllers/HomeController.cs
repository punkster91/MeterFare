using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MeterFare.UI.Controllers
{
    /// <summary>
    /// Home controller
    /// </summary>
    public class HomeController : Controller
    {
        
        // GET: Home
        /// <summary>
        /// Returns the home page
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Returns the view for UI tests
        /// </summary>
        /// <returns></returns>
        public ActionResult TestPage()
        {
            return View();
        }
    }
}