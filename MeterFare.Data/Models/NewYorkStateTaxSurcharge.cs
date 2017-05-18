using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Models
{
    public class NewYorkStateTaxSurcharge : Surcharge
    {
        public NewYorkStateTaxSurcharge()
        {
            this.Name = "New York State Tax Surcharge";
            this.Amount = 0.5m;
        }

        /// <summary>
        /// This is always true since you can't escape taxes in New York State
        /// </summary>
        /// <param name="dateTime">The start time of the meter</param>
        /// <returns>Returns true no matter what</returns>
        public override bool IncludeInFare(DateTime dateTime)
        {
            return true;
        }
    }
}
