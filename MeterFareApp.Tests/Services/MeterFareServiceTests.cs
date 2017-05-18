using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MeterFare.Data.Services;

namespace MeterFare.Tests.Services
{
    [TestClass]
    public class MeterFareServiceTests
    {
        #region GetAmountForNormalSpeed test functions

        [TestMethod]
        public void GetAmountForNormalSpeed_1_POINT_2_Miles_ExpectAmount_210()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 1.2f;
            decimal expectedAmount = 2.10m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled, 
                MeterFareService.DISTANCEINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForNormalSpeed_1_POINT_4_Miles_ExpectAmount_245()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 1.4f;
            decimal expectedAmount = 2.45m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled, 
                MeterFareService.DISTANCEINTERVAL, 
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForNormalSpeed_1_POINT_6_Miles_ExpectAmount_280()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 1.6f;
            decimal expectedAmount = 2.80m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled, 
                MeterFareService.DISTANCEINTERVAL, 
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForNormalSpeed_1_POINT_8_Miles_ExpectAmount_315()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 1.8f;
            decimal expectedAmount = 3.15m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled,
                MeterFareService.DISTANCEINTERVAL, 
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForNormalSpeed_1Miles_ExpectAmount_175()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 1.0f;
            decimal expectedAmount = 1.75m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled,
                MeterFareService.DISTANCEINTERVAL, 
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForNormalSpeed_2Miles_ExpectAmount_350()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            float milesTraveled = 2.0f;
            decimal expectedAmount = 3.5m;

            decimal actualAmount = meterFareService.GetAmountForNormalSpeed(milesTraveled, 
                MeterFareService.DISTANCEINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        #endregion

        #region GetAmountForFasterSpeed test functions

        [TestMethod]
        public void GetAmountForFasterSpeed_1Minutes_ExpectAmount_35cents()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            uint minutesTraveled = 1;
            decimal expectedAmount = 0.35m;

            decimal actualAmount = meterFareService.GetAmountForFasterSpeed(minutesTraveled,
                MeterFareService.MINUTESINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForFasterSpeed_2Minute_ExpectAmount_70cents()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            uint minutesTraveled = 2;
            decimal expectedAmount = 0.70m;

            decimal actualAmount = meterFareService.GetAmountForFasterSpeed(minutesTraveled,
                MeterFareService.MINUTESINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForFasterSpeed_3Minutes_ExpectAmount_105()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            uint minutesTraveled = 3;
            decimal expectedAmount = 1.05m;

            decimal actualAmount = meterFareService.GetAmountForFasterSpeed(minutesTraveled,
                MeterFareService.MINUTESINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForFasterSpeed_4Minutes_ExpectAmount_140()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            uint minutesTraveled = 4;
            decimal expectedAmount = 1.40m;

            decimal actualAmount = meterFareService.GetAmountForFasterSpeed(minutesTraveled,
                MeterFareService.MINUTESINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        [TestMethod]
        public void GetAmountForFasterSpeed_5Minutes_ExpectAmount_175()
        {
            // create meter fare service
            MeterFareService meterFareService = new MeterFareService();

            uint minutesTraveled = 5;
            decimal expectedAmount = 1.75m;

            decimal actualAmount = meterFareService.GetAmountForFasterSpeed(minutesTraveled,
                MeterFareService.MINUTESINTERVAL,
                MeterFareService.UNITFARE);

            Assert.AreEqual(expectedAmount, actualAmount);
        }

        #endregion

        #region CalculateFare tests
        [TestMethod]
        public void CalculateTotalFare_ExpectAmount()
        {
            MeterFareService meterFareService = new MeterFareService();
            // Friday 2010-10-08 at 5:30pm
            DateTime meterTime = new DateTime(2010, 10, 8, 17, 30, 0);
            float milesTraveled = 2f;
            uint minutesTraveled = 5;
 
            decimal expectedFare = 9.75m;
            decimal actualFare = meterFareService.CalculateTotalFare(meterTime,
                MeterFareService.BASEFARE,
                MeterFareService.UNITFARE,
                milesTraveled,
                minutesTraveled);

            Assert.AreEqual(expectedFare, actualFare);
        }

        [TestMethod]
        public void CalculateTotalFare_OnlyEntry_ExpectAmount()
        {
            MeterFareService meterFareService = new MeterFareService();
            // Friday 2010-10-08 at 5:30pm
            DateTime meterTime = new DateTime(2010, 10, 8, 17, 30, 0);
            float milesTraveled = 0f;
            uint minutesTraveled = 0;

            decimal expectedFare = 4.85m;
            decimal actualFare = meterFareService.CalculateTotalFare(meterTime,
                MeterFareService.BASEFARE,
                MeterFareService.UNITFARE,
                milesTraveled,
                minutesTraveled);

            Assert.AreEqual(expectedFare, actualFare);
        }

        #endregion
    }
}
