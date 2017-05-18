using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Models
{
    /// <summary>
    /// An extra cost for the meter fare
    /// </summary>
    public class Surcharge
    {
        /// <summary>
        /// A description for this surcharge type
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The cost of this surcharge type
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Include this surcharge in the total fare based on the meter time
        /// </summary>
        /// <param name="meterTime"></param>
        /// <returns></returns>
        public virtual bool IncludeInFare(DateTime meterTime){
            return true;   
        }
    }
}
