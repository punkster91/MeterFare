using MeterFare.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MeterFare.UI.Controllers
{
    /// <summary>
    /// Meter Fare controller
    /// </summary>
    public class MeterFareController : Controller
    {
        
        // GET: MeterFare
        /// <summary>
        /// Returns the main view
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        // POST: MeterFare/CalculateFare
        /// <summary>
        /// Calculates the meter fare based on the meter time and distance traveled
        /// </summary>
        /// <param name="meterTime"></param>
        /// <param name="milesTraveled"></param>
        /// <param name="minutesTraveled"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CalculateFare(DateTime meterTime, float milesTraveled, uint minutesTraveled)
        {
            MeterFareService meterFareService = new MeterFareService();

            decimal totalFare = meterFareService.CalculateTotalFare(meterTime,
                MeterFareService.BASEFARE,
                MeterFareService.UNITFARE,
                milesTraveled,
                minutesTraveled);

            return Json(
                new
                {
                    TotalFare = totalFare
                }
            );
        }
    }
}