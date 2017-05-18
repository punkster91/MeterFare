using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MeterFare.Data.Models;

namespace MeterFare.Tests.Models
{
    [TestClass]
    public class SurchargeTests
    {
        [TestMethod]
        public void NewYorkStateTaxSurcharge_AlwaysIncluded()
        {
            Surcharge surcharge = new NewYorkStateTaxSurcharge();
            DateTime meterTime = DateTime.Now;

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }

        #region Night surcharge tests
        [TestMethod]
        public void Nightsurcharge_Time_8PM_IsIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 8:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 20, 0, 0);

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }
        [TestMethod]
        public void Nightsurcharge_Time_9PM_IsIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 9:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 21, 0, 0);

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }
        [TestMethod]
        public void Nightsurcharge_Time_11PM_IsIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 11:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 22, 0, 0);

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }

        [TestMethod]
        public void Nightsurcharge_Time_1AM_IsIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 11:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 1, 0, 0);

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }

        [TestMethod]
        public void Nightsurcharge_Time_6AM_IsIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 11:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 6, 0, 0);

            bool expectIncluded = true;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }

        [TestMethod]
        public void Nightsurcharge_Time_7AM_NotIncludedInFare()
        {
            Surcharge surcharge = new NightSurcharge();
            // 2017-05-17 11:00 PM
            DateTime meterTime = new DateTime(2017, 5, 17, 7, 0, 0);

            bool expectIncluded = false;
            bool actualIncluded = surcharge.IncludeInFare(meterTime);

            Assert.AreEqual(expectIncluded, actualIncluded);
        }

        #endregion

        //[TestMethod]
        //public void NewYorkStateTaxSurcharge_AlwaysIncluded()
        //{
        //    Surcharge surcharge = new PeakHoursWeekdaySurcharge();
        //    DateTime meterTime = new DateTime(2017, 5, 17, 21, 0, 0);

        //    bool expectIncluded = true;
        //    bool actualIncluded = surcharge.IncludeInFare(meterTime);

        //    Assert.AreEqual(expectIncluded, actualIncluded);
        //}
    }
}
