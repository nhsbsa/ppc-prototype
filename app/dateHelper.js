//dates.js
function DateHelper(
  today,
  thisDay,
  thisMonth,
  thisYear,
  firstPaymentDate,
  lastPaymentDate,
  endDay,
  endMonth,
  endYear,
  endDate
  ) { 
  this.today = today;
  this.thisDay = thisDay;
  this.thisMonth = thisMonth;
  this.thisYear = thisYear;
  this.firstPaymentDate = firstPaymentDate;
  this.lastPaymentDate = lastPaymentDate;
};

DateHelper.prototype.createEnd = function (day, month, year, duration) {
  //set the end year to the start year and convert to a number:
  //return an end date
  this.endDay = parseInt(day) - 1;
  this.endMonth = parseInt(month);
  this.endYear = parseInt(year);
  this.endDate;
  //if the user selects 12 months - add a year to their end date
  if (duration === 'dd' || duration === 'twelve') {
    this.endYear += 1;
  } else {
  //if the user selects 3 months - add three months to their end date
    this.endMonth += 3;
    this.monthCheck();
  }
  // if 0
  this.dayCheck();
  this.monthCheck();
  this.endDate = this.dateStringCreator(this.endDay, this.endMonth, this.endYear);
  return this.endDate;
};

DateHelper.prototype.dayCheck = function () {
  if (this.endDay === 0) {
    this.endMonth -= 1;
    // 30 days
    if (this.endMonth === 4 || this.endMonth === 6 || this.endMonth === 9 || this.endMonth === 11) {
      this.endDay = 30;
    //feb
    } else if (this.endMonth == 2) {
      this.endDay = 28;
    //31 days
    } else {
      this.endDay = 31;
    }
  }
};

DateHelper.prototype.createDate = function (inday, inmonth, inyear, plusdays) {
  var outDay = (inday + plusdays);
  var outMonth = inmonth + 1;
  var outYear = inyear;
  if (outDay > 28) {
    outMonth++;
    if (inmonth === 1) {
      outDay = outDay - 28;
    } else if (inmonth === 0) {
      outDay = outDay - 28;
    } else if (inmonth === 3 || inmonth === 5 || inmonth === 8 || inmonth === 10) {
      // 3 5 8 10
      outDay = outDay - 30;
    } else {
      // 0 2 4 6 7 9 11
      outDay = outDay - 31;
    }
  }
  return (outDay + " " + this.monthToText(outMonth) + " " + outYear);
};

// jan = 31 - 0 // feb = 28 - 1 // mar = 31 - 2 // apr = 30 - 3 // may = 31 - 4
// jun = 30 - 5 // jul = 31 - 6 // aug = 31 - 7 // sep = 30 - 8 // oct = 31 - 9
// nov = 30 - 10 // dec = 31 - 11

DateHelper.prototype.monthCheck = function () {
  if (this.endMonth > 12) {
    this.endMonth -= 12;
    this.endYear += 1;
  } else if (this.endMonth === 0) {
    this.endMonth = 12;
    this.endYear -= 1;
  }
};

DateHelper.prototype.showDateHelper = function () {
  console.log('day = ' + this.thisDay);
//console.log('month = ' + this.monthToText(this.thisMonth));
  console.log('year = ' + this.thisYear);
};

//convert date to a string
DateHelper.prototype.dateStringCreator = function (day, month, year) {
  return (day + " " + this.monthToText(month) + " " + year);
};

// convert the month to text
DateHelper.prototype.monthToText = function (month) {
  month = month.toString();
  if (month.length > 1) {
    if (month.charAt(0) === '0') {
      month = month.substring(1);
    }
  }
  switch (month) {
    case '0':
      return "January";
    case '1':
      return "January";
    case '2':
      return "February";
    case '3':
      return "March";
    case '4':
      return "April";
    case '5':
      return "May";
    case '6':
      return "June";
    case '7':
      return "July";
    case '8':
      return "August";
    case '9':
      return "September";
    case '10':
      return "October";
    case '11':
      return "November";
    case '12':
      return "December";
  }
};

function createDateHelper() {
  return new DateHelper();
};

module.exports.createDateHelper = createDateHelper;
