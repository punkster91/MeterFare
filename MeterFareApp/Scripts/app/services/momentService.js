(function () {
    "use strict";

    // This service is using momentjs
    var factoryId = "momentService";
    angular
        .module("app")
        .factory(factoryId, ["moment", momentService]);

    function momentService(moment) {
   
        var defaultDateFormat = "yyyy-MM-dd";
        var altDateFormats = ["yyyy/MM/dd"];

        var service = {
            defaultDateFormat: defaultDateFormat,
            altDateFormats: altDateFormats,
            combineDateAndTime: combineDateAndTime,
            toMoment: toMoment
        };


        return service;

        /////////////////////////////////////////////////////////////////////////////

        // combines the two dates into one date with the date portion from the first argument and the time portion from the second argument
        function combineDateAndTime(date, time) {

            var mdate = toMoment(date);
            var mtime = toMoment(time);

            // return a clone of the date argument
            var combinedDate = mdate.clone();

            // change the time portion of the cloned date
            combinedDate.hour(mtime.hour());
            combinedDate.minute(mtime.minute());
            combinedDate.second(mtime.second());
            combinedDate.millisecond(mtime.millisecond());

            return combinedDate;
        }

        // Returns the moment object for the date parameter
        // @param date - expects either a JS date object or a moment object
        function toMoment(date) {
            var mdate;
            if (moment.isDate(date)) {
                mdate = moment(date);
            }
            else if (moment.isMoment(date)) {
                mdate = date.clone();
            }

            if (!mdate.isValid()) {
                throw factoryId + " unable to parse " + date + " into valid moment object";
            }
            
            return mdate;
        }
    }
}());