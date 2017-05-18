using MeterFare.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MeterFare.Data.Models;

namespace MeterFare.Data.Services
{
    public class SurchargesProvider : ISurchargesProvider
    {
        public List<Surcharge> GetAllSurcharges()
        {
            return new List<Surcharge>(new Surcharge[] {
                    new NewYorkStateTaxSurcharge(),
                    new NightSurcharge(),
                    new PeakHoursWeekdaySurcharge()
                });
        }
    }
}
