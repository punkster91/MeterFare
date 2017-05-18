using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Models
{
    public class NightSurcharge : Surcharge
    {
        public NightSurcharge()
        {
            this.Name = "Night Surcharge";
            this.Amount = 0.5m;
        }

        /// <summary>
        /// Includes this surcharge when the time is after 8:00 PM and before 6:00 AM
        /// </summary>
        /// <param name="dateTime">The start time of the meter</param>
        /// <returns>Returns true if this surchage is applicable for this meter start time</returns>
        public override bool IncludeInFare(DateTime dateTime)
        {
            // returns the timespan from midnight
            // hours <= 6 is the time before 6:00 AM
            // hours >= 20 is the time after 8:00 PM
            TimeSpan d = dateTime.TimeOfDay;
            if (d.Hours <= 6 || d.Hours >= 20)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
