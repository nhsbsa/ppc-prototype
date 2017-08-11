function PPC(
  duration,
  startDay,
  startMonth,
  startYear,
  startDate,
  endDay,
  endMonth,
  endYear,
  endDate,
  autoRenew
  ) {
    this.duration = duration;
    this.startDay = startDay;
    this.startMonth = startMonth;
    this.startYear = startYear;
    this.startDate = startDate;
    this.endDay = endDay;
    this.endMonth = endMonth;
    this.endYear = endYear;
    this.endDate = endDate;
    this.autoRenew = autoRenew;
};

function createPPC() {
  return new PPC();
};

module.exports.createPPC = createPPC;