using MeterFare.Data.Interfaces;
using MeterFare.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeterFare.Data.Services
{
    public class MeterFareService
    {
        public const decimal BASEFARE = 3.0m;
        public const decimal UNITFARE = 0.35m;

        public const float DISTANCEINTERVAL = 0.20f;
        public const short MINUTESINTERVAL = 1;

        private List<Surcharge> Surcharges { get; set; }

        public MeterFareService()
        {

        }

        public MeterFareService(ISurchargesProvider surchargesProvider)
        {
            Surcharges = surchargesProvider.GetAllSurcharges();
        }
        /// <summary>
        /// Calculates the total fare for the meter
        /// </summary>
        /// <param name="meterTime">The start time of the meter</param>
        /// <param name="baseFare">The base amount upon entry</param>
        /// <param name="unitFare">The unit fare</param>
        /// <param name="milesTraveledAtNormalSpeed">Miles travel (in 1/5 of a mile unit) traveled under the 6 miles per hour limit</param>
        /// <param name="minutesTraveledAtFasterSpeed">Distance travel (in minutes) over the 6 miles per hour limit</param>
        /// <returns>Returns the total fare for the meter</returns>
        public decimal CalculateTotalFare(DateTime meterTime,
            decimal baseFare,
            decimal unitFare,
            float milesTraveledAtNormalSpeed, 
            uint minutesTraveledAtFasterSpeed)
        {
            decimal total = 0m;

            // include base fare upon entry
            total += baseFare;
            // get amount for miles traveled under 6 miles per hour
            total += GetAmountForNormalSpeed(milesTraveledAtNormalSpeed, DISTANCEINTERVAL, unitFare);
            // get amount for minutes traveled over 6 miles per hour
            total += GetAmountForFasterSpeed(minutesTraveledAtFasterSpeed, MINUTESINTERVAL, unitFare);

            // include any applicable surcharges
            List<Surcharge> applicableSurcharges = GetApplicableSurcharges(Surcharges, meterTime).ToList();
            total += applicableSurcharges.Sum(s => s.Amount);

            return total;
        }

        /// <summary>
        /// Returns an enumerable collection of applicable surcharges based on the meter time
        /// </summary>
        /// <param name="surcharges">All surcharges collection</param>
        /// <param name="meterTime">The start time of the meter</param>
        /// <returns></returns>
        public IEnumerable<Surcharge> GetApplicableSurcharges(IEnumerable<Surcharge> surcharges, DateTime meterTime)
        {
            return surcharges.Where(w => w.IncludeInFare(meterTime));
        }

        /// <summary>
        /// Calculate and get the fare amount for miles traveled at less than 6 miles per hour
        /// </summary>
        /// <param name="milesTraveled"></param>
        /// <param name="distanceInterval"></param>
        /// <param name="unitFare"></param>
        /// <returns></returns>
        public decimal GetAmountForNormalSpeed(float milesTraveled, float distanceInterval, decimal unitFare)
        {
            return (decimal)(milesTraveled / distanceInterval) * unitFare;
        }

        /// <summary>
        /// Calculate and get the fare amount for minutes traveled at more than 6 miles per hour
        /// </summary>
        /// <param name="minutesTraveled"></param>
        /// <param name="minutesInterval"></param>
        /// <param name="unitFare"></param>
        /// <returns></returns>
        public decimal GetAmountForFasterSpeed(uint minutesTraveled, short minutesInterval, decimal unitFare)
        {
            // charge the first unit fare even when the meter is not in motion 
            if (minutesTraveled == 0)
                minutesTraveled = 1;

            return (decimal)(minutesTraveled / minutesInterval) * unitFare;
        }
    }
}
