using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Models
{
    public class PeakHoursWeekdaySurcharge : Surcharge
    {
        public PeakHoursWeekdaySurcharge()
        {
            this.Name = "Peak hour Weekday Surcharge";
            this.Amount = 1.0m;
        }

        /// <summary>
        /// Includes this surcharge when the meter time is on a weekday starting after 4:00 PM and before 8:00 PM
        /// </summary>
        /// <param name="dateTime">The start time of the meter</param>
        /// <returns>Returns true if this surchage is applicable for this meter start time</returns>
        public override bool IncludeInFare(DateTime dateTime)
        {
            // returns the timespan from midnight
            // hours >= 16 is the time after 4:00 AM
            // hours <= 20 is the time before 8:00 PM
            TimeSpan d = dateTime.TimeOfDay;
            if (d.Hours >= 16 && d.Hours <= 20)
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
