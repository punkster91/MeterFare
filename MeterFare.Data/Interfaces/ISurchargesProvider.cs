using MeterFare.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Interfaces
{
    public interface ISurchargesProvider
    {
        List<Surcharge> GetAllSurcharges();
    }
}
