using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace MeterFare.UI.App_Start
{
    /// <summary>
    /// Web api route config
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            // TODO: Add any additional configuration code

            // web api routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{action}",
               defaults: new { controller = "", action="" }
            );
        }
    }
}